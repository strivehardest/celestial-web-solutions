import {
  COMPANY,
  COURSES,
  GHANA_MARKET,
  GLOBAL_COMPARISON,
  AGENCY_COMPARISON,
  PAYMENT,
  PORTFOLIO,
  PRICING,
  PROCESS,
  SERVICES,
  TECH,
  WEB_BASICS,
  formatProjectDeepDive,
  findPortfolioMatches,
  formatServiceDeepDive,
  findServiceMatches,
} from './knowledge';

const SITE = COMPANY.website;
const link = (label, path) => `[${label}](${SITE}${path})`;
const cta = (label, href, variant) => `[[cta:${label}|${href}${variant ? `|${variant}` : ''}]]`;
const CTAS_ROW = `${cta('Get a quote', '/pricing')} ${cta('WhatsApp us', 'https://wa.me/233530505031')} ${cta('Contact form', '/contact', 'secondary')}`;
const CONTACT_LINE = `Talk to the team below.\n${CTAS_ROW}`;

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s#*]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const TOPICS = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'akwaaba', 'how are you'],
    weight: 0.6,
    answer: () =>
      `Hello, and welcome to **Celestial AI**. I can help with anything about ${COMPANY.name}: our services, pricing in Ghana Cedis, payment options, timelines, portfolio and courses, plus general web development advice and how Ghana compares with the rest of the world.\n\nWhat would you like to know?\n${CTAS_ROW}`,
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'medaase', 'akpe', 'great', 'awesome', 'perfect', 'ok', 'okay', 'bye', 'goodbye'],
    weight: 0.7,
    answer: () =>
      `You're welcome. Whenever you're ready to start:\n${cta('Get a quote', '/pricing')} ${cta('Schedule a call', '/schedule-a-call')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}\n\nIs there anything else you'd like to know?`,
  },
  {
    id: 'about',
    keywords: ['who are you', 'about celestial', 'about the company', 'founder', 'ceo', 'waliu', 'company', 'located', 'location', 'where are you', 'based', 'keta', 'accra', 'ghana based', 'history', 'founded', 'team'],
    answer: () =>
      `**${COMPANY.name}** is ${COMPANY.tagline.toLowerCase()}, founded in ${COMPANY.founded} by ${COMPANY.founder}.\n\n- ${COMPANY.locations}\n- ${COMPANY.stats}\n- Stack: React, Next.js, Node.js, Supabase, WordPress, React Native.\n\n${cta('About us', '/about', 'secondary')} ${cta('View portfolio', '/portfolio', 'secondary')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`,
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'what do you do', 'what do you offer', 'offer', 'help me with', 'can you build', 'do you do'],
    weight: 1.1,
    answer: () =>
      `Here is what ${COMPANY.name} offers. Ask for a deep dive on any service by name.\n\n${SERVICES.map(
        (s) => `- **${s.name}** — ${s.summary}\n  ${cta(`View ${s.shortName || s.name}`, s.path, 'secondary')}`
      ).join('\n')}\n\nNot sure which one you need?\n${CTAS_ROW}`,
  },
  {
    id: 'pricing',
    keywords: ['price', 'prices', 'pricing', 'cost', 'how much', 'charge', 'rate', 'rates', 'fee', 'fees', 'budget', 'package', 'packages', 'plan', 'plans', 'quote', 'estimate', 'cheap', 'affordable', 'expensive', 'starter', 'professional', 'enterprise', 'cedis', 'gh₵', 'ghs'],
    answer: () =>
      `${PRICING.range}\n\n${PRICING.packages
        .map((p) => `**${p.name}** - ${p.bestFor}\n- WordPress tier: ${p.wordpress}\n- Custom-coded tier: ${p.custom}`)
        .join('\n\n')}\n\n**Add-ons:** ${PRICING.addOns}\n\n${PRICING.hiddenCosts} ${PRICING.currencyNote}\n\nBuild your own estimate or talk to the team:
${cta('Open pricing', '/pricing')} ${cta('WhatsApp us', 'https://wa.me/233530505031')} ${cta('Schedule a call', '/schedule-a-call', 'secondary')}`,
  },
  {
    id: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'online shop', 'shop', 'store', 'woocommerce', 'shopify', 'sell online', 'products', 'cart', 'checkout'],
    answer: () => {
      const pkg = PRICING.packages.find((p) => p.name === 'E-Commerce');
      return `We build online stores for Ghanaian and international businesses.\n\n- **WooCommerce store:** ${pkg.wordpress}\n- **Custom Next.js store:** ${pkg.custom}\n\n**Every store includes:** ${WEB_BASICS.ecommerceEssentials}\n\nPayments are wired to Paystack, Flutterwave or Stripe with MTN MoMo and Telecel Cash support, so customers can pay the way Ghanaians actually pay. See live examples like Kafui Dey Books, My Space Furniture and DL Auto Parts.
${cta('View portfolio', '/portfolio', 'secondary')} ${cta('Get a store quote', '/pricing')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`;
    },
  },
  {
    id: 'payment',
    keywords: ['pay', 'payment', 'payments', 'paystack', 'ussd', '*415*3370#', '415', 'momo', 'mobile money', 'mtn', 'telecel', 'vodafone', 'bank transfer', 'bank', 'deposit', 'upfront', 'installment', 'instalment', 'payment plan', 'full payment', 'invoice', 'receipt', 'flutterwave', 'stripe', 'card'],
    answer: () =>
      `**Payment policy:** ${PAYMENT.policy}\n\n**Ways to pay:**\n${PAYMENT.methods.map((m) => `- ${m}`).join('\n')}\n\n${PAYMENT.receipt}
${cta('Make a payment', '/payment')} ${cta('WhatsApp proof', 'https://wa.me/233530505031')} ${cta('View pricing', '/pricing', 'secondary')}`,
  },
  {
    id: 'timeline',
    keywords: ['how long', 'timeline', 'duration', 'time frame', 'timeframe', 'deadline', 'weeks', 'days', 'deliver', 'delivery', 'fast', 'quick', 'rush', 'urgent', 'when will', 'turnaround'],
    answer: () =>
      `**Typical timelines:** ${PROCESS.timelines}\n\nPackage delivery windows:\n- Starter: 7-10 days (WordPress) or 14-21 days (custom)\n- Professional: 10-14 days or 21-30 days\n- E-Commerce: 15-21 days or 30-45 days\n- Enterprise: 30-45 days or 60-90 days\n\nTimelines start once payment is confirmed and we have your content (logo, text, images).
${CTAS_ROW}`,
  },
  {
    id: 'process',
    keywords: ['process', 'steps', 'how do you work', 'how does it work', 'workflow', 'procedure', 'get started', 'start', 'begin', 'onboarding', 'revision', 'revisions', 'feedback'],
    answer: () =>
      `**Our process:**\n${PROCESS.steps.map((s) => `- ${s}`).join('\n')}\n\n**Revisions:** ${PROCESS.revisions}\n\nReady to start?
${cta('Schedule a call', '/schedule-a-call')} ${cta('WhatsApp us', 'https://wa.me/233530505031')} ${cta('Get a quote', '/pricing', 'secondary')}`,
  },
  {
    id: 'support',
    keywords: ['support', 'after launch', 'warranty', 'guarantee', 'bug', 'fix', 'update', 'updates', 'backup', 'security', 'hack', 'training', 'manage my website', 'edit my website'],
    answer: () =>
      `**After launch:** ${PROCESS.warranty}\n\n**Maintenance:** ${PRICING.maintenance}\n\n**Training:** every project ends with a training session (in person or virtual) plus videos so you can update content, add products and use your dashboard.\n\n**Ownership:** ${PROCESS.ownership}`,
  },
  {
    id: 'hosting',
    keywords: ['hosting', 'host', 'domain', 'dns', 'ssl', 'https', 'server', 'vercel', 'netlify', 'namecheap', 'hostinger', 'email setup', 'renewal', 'renew', '.com.gh', 'gh domain'],
    answer: () =>
      `**Domains:** ${WEB_BASICS.domain}\n\n**Hosting:** ${WEB_BASICS.hosting}\n\n**What we include:** ${PRICING.hosting}\n\n**SSL:** ${WEB_BASICS.ssl}\n\nRenewal after year one is GH₵800-8,500 per year depending on the package (covers domain, hosting and basic upkeep).`,
  },
  {
    id: 'tech',
    keywords: ['technology', 'technologies', 'tech stack', 'stack', 'react', 'next.js', 'nextjs', 'node', 'supabase', 'wordpress', 'python', 'django', 'tailwind', 'typescript', 'database', 'postgres', 'mongodb', 'sanity', 'framework', 'language', 'programming', 'code'],
    answer: () =>
      `**Technology we use:**\n- Frontend: ${TECH.frontend}\n- Backend: ${TECH.backend}\n- CMS: ${TECH.cms}\n- Mobile: ${TECH.mobile}\n- Payments: ${TECH.payments}\n- Hosting/DevOps: ${TECH.hosting}\n\nWe pick the stack based on your goals and budget: WordPress for content-heavy sites, Next.js/React for apps, portals and stores.`,
  },
  {
    id: 'wordpress-vs-custom',
    keywords: ['wordpress vs', 'custom vs', 'wordpress or', 'custom code', 'custom coded', 'difference between wordpress', 'which is better', 'wix', 'squarespace', 'template', 'diy', 'website builder'],
    weight: 1.4,
    answer: () =>
      `**WordPress vs custom code:** ${GLOBAL_COMPARISON.wordpressVsCustom}\n\n**Freelancer vs agency vs DIY builders:** ${GLOBAL_COMPARISON.freelancerVsAgency}\n\nOur ${link('pricing page', '/pricing')} shows both tiers side by side for every package.`,
  },
  {
    id: 'portfolio',
    keywords: [
      'portfolio',
      'projects',
      'project',
      'examples',
      'work',
      'clients',
      'client',
      'built',
      'websites you',
      'case study',
      'previous',
      'sample',
      'show me your',
      'your websites',
      'your work',
    ],
    weight: 1.2,
    answer: () => {
      const catalogue = PORTFOLIO.map(
        (p) =>
          `- **${p.title}** (${p.category}) — client: ${p.client || 'n/a'}${
            p.country ? `, ${p.country}` : ''
          }; ${p.duration ? `${p.duration}; ` : ''}${(p.tech || []).slice(0, 4).join(', ')}; ${
            p.link ? `[live](${p.link})` : link('case study', p.path)
          }`
      ).join('\n');
      return `We have launched **${PORTFOLIO.length} portfolio projects** for clients in Ghana, the United States and beyond. Here is the full catalogue:\n\n${catalogue}\n\nAsk for a deep dive on any project by name (for example "Tell me about Ghanas Event" or "Deep dive into Finance Tracker") and I will cover the overview, client, timeline, full tech stack and every feature.
${cta('Browse portfolio', '/portfolio')} ${cta('Get a quote', '/pricing', 'secondary')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`;
    },
  },
  {
    id: 'courses',
    keywords: ['course', 'courses', 'learn', 'training course', 'teach', 'class', 'tutorial', 'student', 'bootcamp', 'lesson'],
    answer: () =>
      `**Live online courses from ${COMPANY.name}:**\n${COURSES.map((c) => `- **${link(c.title, c.path)}** - ${c.price}, ${c.duration}, ${c.level}${c.rating ? `, rated ${c.rating}` : ''}. Delivered ${c.mode}.`).join('\n')}\n\n${cta('Browse courses', '/courses')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'phone', 'call', 'whatsapp', 'email', 'number', 'talk to', 'speak', 'schedule', 'book', 'appointment', 'meeting', 'consultation', 'address', 'office'],
    answer: () =>
      `**Contact ${COMPANY.name}:**\n- WhatsApp: [${COMPANY.whatsapp.split(' (')[0]}](https://wa.me/233530505031)\n- Phone: ${COMPANY.phones.map((p) => `[${p}](tel:${p.replace(/\s+/g, '')})`).join(', ')}\n- Email: [${COMPANY.email}](mailto:${COMPANY.email})\n- ${COMPANY.locations}\n- ${COMPANY.hours}\n\n${cta('Schedule a call', '/schedule-a-call')} ${cta('Contact form', '/contact')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`,
  },
  {
    id: 'ghana-market',
    keywords: ['ghana', 'ghanaian', 'accra', 'kumasi', 'takoradi', 'tamale', 'local', 'in ghana', 'ghana market', 'best web design company', 'web design company in ghana', 'choose', 'trust', 'scam', 'reliable', 'data protection'],
    answer: () =>
      `**Web development in Ghana:** ${GHANA_MARKET.overview}\n\n**Local pricing:** ${GHANA_MARKET.localPricing}\n\n**Choosing a provider:** ${GHANA_MARKET.whatToLookFor}\n\n**Compliance:** ${GHANA_MARKET.compliance}\n\n${GHANA_MARKET.cities}`,
  },
  {
    id: 'agency-comparison',
    keywords: [
      'agency',
      'agencies',
      'competitor',
      'competitors',
      'compare to',
      'compared to',
      'comparison with',
      'better than',
      'vs agency',
      'versus agency',
      'other companies',
      'other agency',
      'other agencies',
      'web design company',
      'web development company',
      'why choose celestial',
      'why celestial',
      'difference between',
      'which agency',
      'best agency',
      'best web design',
      'best web development',
      'freelancer vs',
      'agency vs',
      'wix vs',
      'squarespace',
      'shopify vs',
      'outsource',
    ],
    weight: 1.45,
    answer: () =>
      `**How to compare any web agency to ${COMPANY.name}:** ${AGENCY_COMPARISON.howToCompare}\n\n**Vs freelancers:** ${AGENCY_COMPARISON.vsFreelancers}\n\n**Vs other Ghana agencies:** ${AGENCY_COMPARISON.vsGhanaAgencies}\n\n**Vs international agencies:** ${AGENCY_COMPARISON.vsInternational}\n\n**Vs DIY builders (Wix/Squarespace/Shopify):** ${AGENCY_COMPARISON.vsDiy}\n\n**Vs template shops:** ${AGENCY_COMPARISON.vsTemplateShops}\n\n**Where Celestial stands out:** ${AGENCY_COMPARISON.strengths}\n\n**Honest limits:** ${AGENCY_COMPARISON.honestLimits}\n\nName another agency or paste their quote and I will compare it line by line.
${cta('View pricing', '/pricing')} ${cta('WhatsApp a brief', 'https://wa.me/233530505031')}`,
  },
  {
    id: 'comparison',
    keywords: ['compare', 'comparison', 'versus', 'vs', 'abroad', 'international', 'nigeria', 'kenya', 'south africa', 'india', 'uk', 'usa', 'america', 'europe', 'united states', 'london', 'world', 'global', 'overseas', 'outsource', 'offshore', 'foreign', 'other countries', 'around the world', 'cheaper than', 'better than', 'why ghana', 'hire from ghana'],
    weight: 1.3,
    answer: () =>
      `**Cost comparison (estimates that vary by scope):** ${GLOBAL_COMPARISON.pricing}\n\n**Quality:** ${GLOBAL_COMPARISON.quality}\n\n**Why hire from Ghana:** ${GLOBAL_COMPARISON.advantages}\n\n**Things to check:** ${GLOBAL_COMPARISON.considerations}`,
  },
  {
    id: 'trends',
    keywords: ['trend', 'trends', 'future', '2026', 'ai', 'artificial intelligence', 'chatbot', 'pwa', 'headless', 'jamstack', 'modern', 'latest', 'new technology'],
    answer: () =>
      `**Current web development trends:** ${GLOBAL_COMPARISON.trends}\n\nIf you want any of these in your project (including an AI assistant like this one), ${CONTACT_LINE.charAt(0).toLowerCase()}${CONTACT_LINE.slice(1)}`,
  },
  {
    id: 'seo',
    keywords: ['seo', 'rank', 'ranking', 'google', 'search engine', 'traffic', 'first page', 'keywords', 'digital marketing', 'marketing', 'ads', 'advertising', 'social media'],
    answer: () =>
      `**SEO:** ${WEB_BASICS.seo}\n\nOur ${link('SEO services', '/web-design-company-in-ghana/seo-services-in-ghana')} cover technical SEO, local SEO for Ghanaian cities, content and monthly reporting. The advanced SEO package is a GH₵800 add-on to any website, and we also manage ${link('Google Ads', '/web-design-company-in-ghana/google-ads-management-in-ghana')} and ${link('Google AdSense', '/web-design-company-in-ghana/google-adsense-management-in-ghana')}.`,
  },
  {
    id: 'mobile',
    keywords: ['mobile friendly', 'responsive', 'phone', 'tablet', 'mobile app', 'android', 'ios', 'app store', 'play store', 'react native', 'expo'],
    answer: () =>
      `**Responsive websites:** ${WEB_BASICS.responsive}\n\n**Mobile apps:** we build Android and iOS apps with React Native and Expo, backed by Supabase and Paystack (see the Ghanas Event mobile app in our ${link('portfolio', '/portfolio')}). Mobile app development starts from GH₵12,000 as an add-on or as a standalone project.`,
  },
  {
    id: 'discount',
    keywords: ['discount', 'negotiate', 'negotiable', 'reduce', 'lower price', 'cheaper', 'promo', 'offer', 'deal', 'student price', 'ngo', 'church', 'startup discount'],
    weight: 1.2,
    answer: () =>
      `Our published prices already sit below the typical agency rates in Ghana, and the WordPress tiers are the most budget-friendly route (Starter from GH₵2,500). Ways to keep costs down:\n\n- Choose the WordPress tier and add custom features later.\n- Start with fewer pages (extra pages are GH₵200 each when you need them).\n- Provide your own content and images to shorten the timeline.\n- Bundle a website with SEO or maintenance and ask about a package rate.\n\nFor churches, schools, NGOs, students and startups, tell the team about your project on [WhatsApp](https://wa.me/233530505031) and they will quote the most affordable option. Any discount must be agreed in writing before payment.`,
  },
  {
    id: 'refund',
    keywords: ['refund', 'refunds', 'money back', 'cancel', 'cancellation', 'terminate', 'termination', 'stop the project', 'change my mind', 'dispute', 'terms', 'conditions', 'contract', 'agreement', 'policy', 'liability'],
    weight: 1.2,
    answer: () =>
      `Key points from our ${link('Terms of Service', '/terms')}:\n\n- **Cancellation:** you may cancel with written notice but remain liable for work completed and expenses incurred; refunds for terminated projects are calculated based on work completed.\n- **Ongoing services:** maintenance and other subscriptions need 30 days written notice.\n- **Courses:** course fees are non-refundable once access is granted, except for technical issues reported within 24 hours of enrolment.\n- **Warranty:** 30 days of free bug fixes and minor adjustments after launch; new features beyond the agreed scope are quoted separately.\n- **Ownership:** you own your content, logos and data; source code ownership is included in custom builds as agreed in the project contract.\n- **Portfolio credit:** a small "Designed by Celestial Web Solutions" credit appears in the footer; removing it costs GH₵500 and must be requested in writing before delivery.\n\nThis is general information, not legal advice. Full details are on the ${link('terms page', '/terms')}.`,
  },
  {
    id: 'redesign',
    keywords: ['redesign', 'revamp', 'existing website', 'old website', 'current website', 'upgrade', 'migrate', 'migration', 'move my website', 'fix my website', 'slow website', 'speed', 'performance', 'loading', 'improve my website', 'broken'],
    weight: 1.1,
    answer: () =>
      `Yes, we redesign and rescue existing websites.\n\n- **Redesign:** a fresh, mobile-first design on WordPress or Next.js, keeping your domain and content. Priced like a new build (from GH₵2,500) minus anything reusable.\n- **Migration:** moving from Wix, Squarespace, Blogger or an old host to WordPress or Next.js, with redirects so you keep your Google rankings.\n- **Speed and performance:** image optimisation, caching, code clean-up and hosting upgrades to pass Core Web Vitals.\n- **Fixes and security:** malware clean-up, broken pages, SSL and backup setup via our ${link('IT support service', '/web-design-company-in-ghana/it-support-in-ghana')}.\n\nSend your current website link on [WhatsApp](https://wa.me/233530505031) for a free review and quote.`,
  },
  {
    id: 'careers',
    keywords: ['job', 'jobs', 'career', 'careers', 'hire me', 'internship', 'intern', 'vacancy', 'work with you', 'join your team', 'partnership', 'partner', 'collaborate', 'reseller', 'referral', 'commission'],
    weight: 1.1,
    answer: () =>
      `We're always glad to hear from talented developers, designers and partners. There is no public job board at the moment, so send your CV or portfolio to [${COMPANY.email}](mailto:${COMPANY.email}) or message us on [WhatsApp](https://wa.me/233530505031). For referral or reseller partnerships (for example agencies or freelancers who bring clients), reach out the same way and the team will share the arrangement.`,
  },
  {
    id: 'what-is-web-dev',
    keywords: ['what is web development', 'what is a website', 'why do i need a website', 'need a website', 'benefits of a website', 'why website', 'digital presence', 'online presence', 'what does a web developer do'],
    weight: 1.5,
    answer: () =>
      `**Web development** is the work of building websites and web applications that people open in a browser or on a phone.\n\nIt usually covers three layers:\n- **Design (UI/UX):** how the site looks and how easy it is to use.\n- **Frontend:** the pages visitors see (HTML, CSS, JavaScript, React, Next.js).\n- **Backend:** the server, database, payments and admin tools that power the site.\n\n**Why your business needs a website:**\n- Customers search Google before they buy; no website means they find a competitor.\n- A site works 24/7 as your shopfront, brochure and sales person.\n- In Ghana, over 90% of web traffic is on mobile, so a fast, mobile-friendly site with WhatsApp and mobile money is a real advantage.\n- You own your brand online instead of relying only on Facebook or Instagram, which can change rules or shut pages overnight.\n\n**Related basics:**\n- Domain: ${WEB_BASICS.domain}\n- Hosting: ${WEB_BASICS.hosting}\n- SSL: ${WEB_BASICS.ssl}\n- SEO: ${WEB_BASICS.seo}\n\nReady to start? Packages begin at GH₵2,500.
${cta('Get a quote', '/pricing')} ${cta('WhatsApp us', 'https://wa.me/233530505031')} ${cta('See services', '/web-design-company-in-ghana', 'secondary')}`,
  },
  {
    id: 'faq-basics',
    keywords: ['what is a website', 'what is', 'explain', 'meaning', 'define', 'cms', 'content management', 'why do i need a website', 'need a website', 'benefits of a website'],
    weight: 0.8,
    answer: () =>
      `Here are the basics:\n\n- **Domain:** ${WEB_BASICS.domain}\n- **Hosting:** ${WEB_BASICS.hosting}\n- **SSL:** ${WEB_BASICS.ssl}\n- **CMS:** ${WEB_BASICS.cms}\n- **Responsive design:** ${WEB_BASICS.responsive}\n- **SEO:** ${WEB_BASICS.seo}\n\nA professional website builds trust, lets customers find you on Google, accepts payments 24/7 and works as your best salesperson.
${CTAS_ROW}`,
  },
];

const FALLBACK = () =>
  `I'm not certain about that one. I can help with ${COMPANY.name} services, pricing, payment options (including Paystack USSD *415*3370#), timelines, portfolio, courses and general web development questions, including how Ghana compares with other countries.\n\nFor anything specific to your project:
${CTAS_ROW}`;

function scoreTopic(topic, text) {
  let score = 0;
  for (const kw of topic.keywords) {
    const k = normalize(kw);
    if (!k) continue;
    if (k.includes(' ')) {
      if (text.includes(k)) score += 2 + k.split(' ').length * 0.5;
    } else {
      const re = new RegExp(`(^|\\s)${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(s|es)?(\\s|$)`, 'u');
      if (re.test(text)) score += 2;
    }
  }
  return score * (topic.weight || 1);
}

export function answerLocally(question, { language = 'en' } = {}) {
  const text = ` ${normalize(question || '')} `;
  if (!text.trim()) return FALLBACK();

  // Prefer a deep service dive whenever a specific service is clearly named.
  const serviceHits = findServiceMatches(question);
  const bestService = serviceHits[0];
  const isServicesCatalogue =
    /\b(what (do you|services)|your services|list (your )?services|what can you (do|offer))\b/i.test(question || '') &&
    !/\b(tell me about|deep dive|in detail|detail on)\b/i.test(question || '');

  if (bestService && bestService.score >= 4 && !(isServicesCatalogue && bestService.score < 8)) {
    let reply = formatServiceDeepDive(bestService.service);
    if (language && language !== 'en') {
      reply += `\n\n_Detailed answers are currently available in English. For help in another language, message us on WhatsApp._`;
    }
    return reply;
  }

  // Prefer a deep portfolio dive whenever a specific project is clearly named.
  const projectHits = findPortfolioMatches(question);
  const bestProject = projectHits[0];
  const secondProject = projectHits[1];
  const isCatalogueAsk =
    /\b(your portfolio|full portfolio|all projects|your projects|your work|show me your|examples of your|websites you built|list (your )?projects)\b/i.test(
      question || ''
    ) && !/\b(tell me about|deep dive|case study|in detail|detail on)\b/i.test(question || '');
  const isPricingOrPaymentAsk =
    /\b(price|prices|pricing|cost|how much|quote|budget|pay|payment|momo|paystack|package|packages)\b/i.test(
      question || ''
    );
  const isAgencyCompareAsk =
    /\b(compar(e|ison|ed|ing)|versus|\bvs\b|other agenc|other companies|better than|why choose)\b/i.test(
      question || ''
    );

  if (
    bestProject &&
    bestProject.score >= 5 &&
    !isCatalogueAsk &&
    !isAgencyCompareAsk &&
    !(isPricingOrPaymentAsk && bestProject.score < 9)
  ) {
    let reply = formatProjectDeepDive(bestProject.project);
    if (secondProject && secondProject.score >= bestProject.score * 0.85 && secondProject.score >= 5) {
      reply += `\n\n---\n\nAlso related:\n\n${formatProjectDeepDive(secondProject.project)}`;
    } else {
      reply += `\n\nWant the same depth on another project? Ask for it by name.\n${cta('Browse portfolio', '/portfolio', 'secondary')} ${cta('Get a quote', '/pricing')} ${cta('WhatsApp us', 'https://wa.me/233530505031')}`;
    }
    if (language && language !== 'en') {
      reply += `\n\n_Detailed answers are currently available in English. For help in another language, message us on [WhatsApp](https://wa.me/233530505031)._`;
    }
    return reply;
  }

  const ranked = TOPICS.map((t) => ({ t, score: scoreTopic(t, text) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  let reply;
  if (!ranked.length) {
    // Soft project match as a helpful fallback
    if (bestProject && bestProject.score >= 6 && !isAgencyCompareAsk) {
      reply = formatProjectDeepDive(bestProject.project);
    } else if (bestService && bestService.score >= 4) {
      reply = formatServiceDeepDive(bestService.service);
    } else {
      reply = FALLBACK();
    }
  } else {
    const [best, second] = ranked;
    reply = best.t.answer();
    if (second && second.t.id !== 'greeting' && second.score >= best.score * 0.75 && second.t.id !== best.t.id) {
      reply += `\n\n---\n\n${second.t.answer()}`;
    }
  }

  if (language && language !== 'en') {
    reply += `\n\n_Detailed answers are currently available in English. For help in another language, message us on [WhatsApp](https://wa.me/233530505031)._`;
  }
  return reply;
}
