/**
 * Shared Terms of Service content for the /terms page and branded PDF download.
 * Keep this as the single source of truth for legal copy.
 */

const TERMS_META = {
  title: 'Terms & Conditions',
  company: 'Celestial Web Solutions',
  lastUpdated: 'September 10, 2026',
  website: 'https://www.celestialwebsolutions.net',
  email: 'info@celestialwebsolutions.net',
  phone: '+233 24 567 1832',
  whatsapp: '+233 53 050 5031',
  address: '235 Agblor Link, Keta, Ghana',
  filename: 'Celestial-Web-Solutions-Terms-and-Conditions.pdf',
  intro:
    "These terms and conditions outline the rules and regulations for the use of Celestial Web Solutions' services. By engaging our services, you agree to these terms in full. Please read them carefully and contact us if you have any questions.",
};

const TERMS_SECTIONS = [
  {
    title: '1. Agreement to Terms',
    iconKey: 'fileText',
    content: `By accessing and using the services provided by Celestial Web Solutions ("we," "our," or "us"), you ("client," "you," or "your") accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms and conditions, you are not authorized to use or access our services.

These terms constitute a legally binding agreement between you and Celestial Web Solutions. We reserve the right to update, change or replace any part of these Terms and Conditions by posting updates and/or changes to our website.`,
  },
  {
    title: '2. Services Description',
    iconKey: 'users',
    content: `Celestial Web Solutions provides web development, web design, e-commerce solutions, digital marketing, SEO optimization, and related technology services. Our services include but are not limited to:

• Custom website development using modern technologies (React, Next.js, WordPress, etc.)
• Responsive web design and user experience optimization
• E-commerce platform development and integration
• Search engine optimization (SEO) services
• Website maintenance and support services
• Digital marketing and online advertising management
• Domain registration and web hosting services

All services are provided according to the specifications agreed upon in individual project contracts or service agreements.`,
  },
  {
    title: '3. Payment Terms',
    iconKey: 'creditCard',
    content: `Payment terms are specified in individual project agreements. Unless otherwise agreed:

• Full payment is required before any project work begins for most projects
• Flexible payment plans may be offered for larger, higher-cost projects only, and must be agreed in writing before work starts
• We accept payments in Ghana Cedis (₵) through mobile money, bank transfer, cash, Paystack (online or USSD *415*3370#), and international payments via Flutterwave/Paystack
• Work will not commence until the agreed initial payment has been received and confirmed
• Monthly service fees (hosting, maintenance, SEO) are due in advance
• Late payments may incur a fee of 2% per month on outstanding amounts
• All prices quoted are valid for 30 days unless otherwise stated
• Additional work beyond the original scope will be charged separately

This policy ensures we can dedicate our full resources to your project from day one. Payment schedules and methods will be clearly outlined in your project agreement.`,
  },
  {
    title: '4. Project Timeline & Delivery',
    iconKey: 'clock',
    content: `Project timelines are estimates based on project complexity and scope:

• Timeline estimates are provided in good faith based on project requirements
• Actual delivery dates may vary due to project complexity, client feedback cycles, or unforeseen technical challenges
• Client delays in providing required materials, feedback, or approvals may extend project timelines
• We will communicate any significant delays promptly and work to minimize impact
• Rush projects may incur additional fees (25-50% surcharge)
• Project completion is subject to final client approval
• We strive to deliver projects on or before the agreed timeline

Timeline adjustments will be communicated and agreed upon with clients as needed.`,
  },
  {
    title: '5. Client Responsibilities',
    iconKey: 'checkCircle',
    content: `Clients are responsible for providing the following to ensure successful project completion:

• Accurate project requirements and specifications
• Timely provision of content, images, logos, and other materials
• Prompt feedback and approvals during the development process
• Access to necessary third-party services (hosting, domain, existing systems)
• Payment according to agreed terms (full payment upfront for most projects)
• Reasonable and constructive feedback during review phases
• Final content review and approval before project launch
• Compliance with applicable laws and regulations for their business

Delays in client responsibilities may impact project timelines and may incur additional charges for extended project duration.`,
  },
  {
    title: '6. Intellectual Property & Ownership',
    iconKey: 'shield',
    content: `Ownership rights are clearly defined as follows:
• Upon full payment, clients own the final delivered website/application and custom code developed specifically for their project
• Clients retain ownership of their business content, images, logos, and proprietary information
• Celestial Web Solutions retains rights to general methodologies, techniques, and any pre-existing intellectual property
• Third-party software, plugins, and frameworks remain subject to their respective licenses
• We reserve the right to use completed projects in our portfolio and marketing materials (unless otherwise agreed)
• Any custom graphics, designs, or code developed specifically for your project becomes your property upon full payment
• We may reuse general concepts, layouts, or non-proprietary elements in future projects

Detailed intellectual property terms will be specified in individual project agreements.`,
  },
  {
    title: '7. Footer Credit & Attribution',
    iconKey: 'info',
    content: `Celestial Web Solutions reserves the right to display our company name and/or a "Developed by Celestial Web Solutions" credit in the footer section of any website we design or develop. This credit may appear as a small text link or logo in the website's footer, typically stating "Developed by Celestial Web Solutions" and linking to our official website.

This practice is standard in the web development industry and serves as a form of professional recognition and portfolio building. It does not affect the functionality or user experience of your website.

If a client wishes to remove this credit, a fee of 500 Ghana Cedis (₵500) or the equivalent in another currency will apply. This fee compensates for the loss of public attribution and helps support our business growth. The removal request must be made in writing before the project is completed and delivered. Upon payment of the removal fee, we will ensure the credit is not displayed on your website.

Exceptions to this policy may be considered for sensitive projects or upon mutual agreement, but must be discussed and confirmed in writing prior to project launch.`,
  },
  {
    title: '8. Warranties & Support',
    iconKey: 'alertTriangle',
    content: `Our warranty and support terms include:

• 30-day warranty on custom development work for bug fixes and minor adjustments
• Ongoing support packages available for continued maintenance and updates
• We do not warrant that websites will be error-free or uninterrupted
• Third-party software/services are subject to their own warranties and terms
• Support response times vary based on support package (24-72 hours typical)
• Emergency support available for critical issues (additional charges may apply)
• We provide training and documentation to help clients manage their websites
• Major changes or new features beyond original scope are not covered under warranty

Extended support and maintenance packages are available and recommended for optimal website performance.`,
  },
  {
    title: '9. Limitation of Liability',
    iconKey: 'info',
    content: `Celestial Web Solutions' liability is limited as follows:

• Our total liability for any project shall not exceed the total amount paid by the client for that specific project
• We are not liable for indirect, incidental, special, consequential, or punitive damages
• We are not responsible for data loss, business interruption, or lost profits
• Clients are responsible for maintaining backups of their data and content
• We are not liable for issues arising from third-party services, hosting providers, or external integrations
• Force majeure events (natural disasters, government actions, etc.) may excuse performance delays
• We recommend clients maintain appropriate business insurance coverage

These limitations apply to the maximum extent permitted by law in Ghana.`,
  },
  {
    title: '10. Online Courses & Educational Services',
    iconKey: 'users',
    content: `Celestial Web Solutions offers online courses on various topics including WordPress, Next.js, Web Design, and Excel. The following terms apply:

• All course materials and content are provided "as is" for educational purposes
• Students must have a valid email address to enroll in courses
• After successful payment, course access is immediately available
• Course materials are available for download immediately upon enrollment
• Courses may be accessed through multiple platforms: online videos, Google Meet, Zoom, Teams, and in-person classes
• Course content is subject to change at our discretion with appropriate notice
• Students are expected to respect intellectual property rights; course materials cannot be shared or redistributed
• Refunds are not available for courses once access has been granted, except in cases of technical issues
• Course completion certificates are issued upon meeting all course requirements
• Student progress and data collected during courses are kept confidential and used for course improvement only
• We reserve the right to remove students who violate course policies or code of conduct

All course enrollments are governed by these terms and the specific course agreement provided at enrollment.`,
  },
  {
    title: '11. Payment for Courses & Educational Services',
    iconKey: 'creditCard',
    content: `Payment terms for online courses:

• Payments are processed through Paystack, our secure payment processor
• All prices are displayed in Ghana Cedis (GH₵) unless otherwise noted
• Payment must be completed before course access is granted
• All course fees are non-refundable once access has been provided
• Technical refunds may be issued within 24 hours of enrollment if courses cannot be accessed due to system errors
• Discounted course pricing may apply for limited periods; prices are subject to change
• We accept all payment methods available through Paystack
• Payment confirmation and course access details will be sent to the enrolled email address
• Students must complete a post-enrollment Google Form with their profile information

All financial transactions are final unless technical issues prevent course access.`,
  },
  {
    title: '12. Termination',
    iconKey: 'alertTriangle',
    content: `Either party may terminate services under the following conditions:

• Client may terminate services at any time with written notice, but remains liable for work completed and expenses incurred
• We may terminate services for non-payment, breach of terms, or if client requests violate legal/ethical standards
• Upon termination, client will receive all completed work upon payment of outstanding invoices
• Ongoing service subscriptions require 30 days written notice for cancellation
• Students may request course unenrollment within 24 hours of initial enrollment for technical issues only
• Refunds for terminated projects will be calculated based on work completed
• All confidential information must be returned or destroyed upon termination
• Termination does not relieve either party of obligations that arose before termination

Termination procedures and any applicable refunds will be handled professionally and promptly.`,
  },
  {
    title: '13. Governing Law & Dispute Resolution',
    iconKey: 'shield',
    content: `These terms are governed by the laws of Ghana:

• Any disputes will first be addressed through good faith negotiation
• If negotiation fails, disputes will be resolved through arbitration in Accra, Ghana
• Ghana courts will have jurisdiction over any legal proceedings
• These terms are interpreted according to Ghanaian law
• Any invalid provisions will not affect the validity of remaining terms
• Amendments must be in writing and signed by both parties
• These terms supersede all previous agreements between the parties

We are committed to resolving any disputes fairly and professionally in accordance with Ghanaian legal standards.`,
  },
];

module.exports = {
  TERMS_META,
  TERMS_SECTIONS,
};
