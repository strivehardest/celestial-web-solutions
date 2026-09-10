import {
  COMPANY,
  COURSES,
  GHANA_MARKET,
  GLOBAL_COMPARISON,
  PAYMENT,
  PORTFOLIO,
  PRICING,
  PROCESS,
  SERVICES,
  TECH,
  WEB_BASICS,
} from './knowledge';

const SITE = COMPANY.website;
const link = (label, path) => `[${label}](${SITE}${path})`;
const CONTACT_LINE = `Talk to the team on [WhatsApp](https://wa.me/233530505031), call ${COMPANY.phone}, or use the ${link('contact page', '/contact')}.`;

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
      `Hello, and welcome to **Celestial AI**. I can help with anything about ${COMPANY.name}: our services, pricing in Ghana Cedis, payment options, timelines, portfolio and courses, plus general web development advice and how Ghana compares with the rest of the world.\n\nWhat would you like to know?`,
  },
  {
    id: 'about',
    keywords: ['who are you', 'about celestial', 'about the company', 'founder', 'ceo', 'waliu', 'company', 'located', 'location', 'where are you', 'based', 'keta', 'accra', 'ghana based', 'history', 'founded', 'team'],
    answer: () =>
      `**${COMPANY.name}** is ${COMPANY.tagline.toLowerCase()}, founded in ${COMPANY.founded} by ${COMPANY.founder}.\n\n- ${COMPANY.locations}\n- ${COMPANY.stats}\n- Stack: React, Next.js, Node.js, Supabase, WordPress, React Native.\n\nRead more on the ${link('about page', '/about')} or browse the ${link('portfolio', '/portfolio')}.`,
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'what do you do', 'what do you offer', 'offer', 'help me with', 'can you build', 'do you do', 'seo', 'google ads', 'adsense', 'it support', 'ux', 'ui design', 'web design', 'web development', 'mobile app', 'app development', 'maintenance'],
    answer: () =>
      `Here is what ${COMPANY.name} offers:\n\n${SERVICES.map((s) => `- **${link(s.name, s.path)}** - ${s.summary}`).join('\n')}\n\nNot sure which one you need? ${CONTACT_LINE}`,
  },
  {
    id: 'pricing',
    keywords: ['price', 'prices', 'pricing', 'cost', 'how much', 'charge', 'rate', 'rates', 'fee', 'fees', 'budget', 'package', 'packages', 'plan', 'plans', 'quote', 'estimate', 'cheap', 'affordable', 'expensive', 'starter', 'professional', 'enterprise', 'cedis', 'gh₵', 'ghs'],
    answer: () =>
      `${PRICING.range}\n\n${PRICING.packages
        .map((p) => `**${p.name}** - ${p.bestFor}\n- WordPress tier: ${p.wordpress}\n- Custom-coded tier: ${p.custom}`)
        .join('\n\n')}\n\n**Add-ons:** ${PRICING.addOns}\n\n${PRICING.hiddenCosts} ${PRICING.currencyNote}\n\nBuild your own estimate on the ${link('pricing page', '/pricing')}, or ${CONTACT_LINE.charAt(0).toLowerCase()}${CONTACT_LINE.slice(1)}`,
  },
  {
    id: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'online shop', 'shop', 'store', 'woocommerce', 'shopify', 'sell online', 'products', 'cart', 'checkout'],
    answer: () => {
      const pkg = PRICING.packages.find((p) => p.name === 'E-Commerce');
      return `We build online stores for Ghanaian and international businesses.\n\n- **WooCommerce store:** ${pkg.wordpress}\n- **Custom Next.js store:** ${pkg.custom}\n\n**Every store includes:** ${WEB_BASICS.ecommerceEssentials}\n\nPayments are wired to Paystack, Flutterwave or Stripe with MTN MoMo and Telecel Cash support, so customers can pay the way Ghanaians actually pay. See examples like Kafui Dey Books, My Space Furniture and DL Auto Parts in the ${link('portfolio', '/portfolio')}.`;
    },
  },
  {
    id: 'payment',
    keywords: ['pay', 'payment', 'payments', 'paystack', 'ussd', '*415*3370#', '415', 'momo', 'mobile money', 'mtn', 'telecel', 'vodafone', 'bank transfer', 'bank', 'deposit', 'upfront', 'installment', 'instalment', 'payment plan', 'full payment', 'invoice', 'receipt', 'flutterwave', 'stripe', 'card'],
    answer: () =>
      `**Payment policy:** ${PAYMENT.policy}\n\n**Ways to pay:**\n${PAYMENT.methods.map((m) => `- ${m}`).join('\n')}\n\n${PAYMENT.receipt} Full details are on the ${link('payment page', '/payment')}.`,
  },
  {
    id: 'timeline',
    keywords: ['how long', 'timeline', 'duration', 'time frame', 'timeframe', 'deadline', 'weeks', 'days', 'deliver', 'delivery', 'fast', 'quick', 'rush', 'urgent', 'when will', 'turnaround'],
    answer: () =>
      `**Typical timelines:** ${PROCESS.timelines}\n\nPackage delivery windows:\n- Starter: 7-10 days (WordPress) or 14-21 days (custom)\n- Professional: 10-14 days or 21-30 days\n- E-Commerce: 15-21 days or 30-45 days\n- Enterprise: 30-45 days or 60-90 days\n\nTimelines start once payment is confirmed and we have your content (logo, text, images). ${CONTACT_LINE}`,
  },
  {
    id: 'process',
    keywords: ['process', 'steps', 'how do you work', 'how does it work', 'workflow', 'procedure', 'get started', 'start', 'begin', 'onboarding', 'revision', 'revisions', 'feedback'],
    answer: () =>
      `**Our process:**\n${PROCESS.steps.map((s) => `- ${s}`).join('\n')}\n\n**Revisions:** ${PROCESS.revisions}\n\nReady to start? ${link('Schedule a free call', '/schedule-a-call')} or message us on [WhatsApp](https://wa.me/233530505031).`,
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
    keywords: ['portfolio', 'projects', 'project', 'examples', 'work', 'clients', 'client', 'built', 'websites you', 'case study', 'previous', 'sample', 'ghanas event', 'campus care', 'kafui', 'afrocinema', 'copti', 'finance tracker'],
    answer: () => {
      const sample = PORTFOLIO.slice(0, 8)
        .map((p) => `- **${p.title}** (${p.category}) - ${p.link ? `[live site](${p.link})` : link('details', `/portfolio/${p.slug}`)}; ${p.tech.slice(0, 4).join(', ')}`)
        .join('\n');
      return `We have launched ${PORTFOLIO.length}+ projects for clients in Ghana, the US and beyond. A few highlights:\n\n${sample}\n\nBrowse everything in the ${link('portfolio', '/portfolio')}.`;
    },
  },
  {
    id: 'courses',
    keywords: ['course', 'courses', 'learn', 'training course', 'teach', 'class', 'tutorial', 'student', 'bootcamp', 'lesson'],
    answer: () =>
      `**Live online courses from ${COMPANY.name}:**\n${COURSES.map((c) => `- **${link(c.title, c.path)}** - ${c.price}, ${c.duration}, ${c.level}${c.rating ? `, rated ${c.rating}` : ''}. Delivered ${c.mode}.`).join('\n')}\n\nSee all courses at ${link('celestialwebsolutions.net/courses', '/courses')}.`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'phone', 'call', 'whatsapp', 'email', 'number', 'talk to', 'speak', 'schedule', 'book', 'appointment', 'meeting', 'consultation', 'address', 'office'],
    answer: () =>
      `**Contact ${COMPANY.name}:**\n- WhatsApp: [${COMPANY.whatsapp.split(' (')[0]}](https://wa.me/233530505031)\n- Phone: ${COMPANY.phones.map((p) => `[${p}](tel:${p.replace(/\s+/g, '')})`).join(', ')}\n- Email: [${COMPANY.email}](mailto:${COMPANY.email})\n- ${COMPANY.locations}\n- ${COMPANY.hours}\n\nYou can also ${link('schedule a free call', '/schedule-a-call')} or send a message via the ${link('contact page', '/contact')}.`,
  },
  {
    id: 'ghana-market',
    keywords: ['ghana', 'ghanaian', 'accra', 'kumasi', 'takoradi', 'tamale', 'local', 'in ghana', 'ghana market', 'best web design company', 'web design company in ghana', 'choose', 'trust', 'scam', 'reliable', 'data protection'],
    answer: () =>
      `**Web development in Ghana:** ${GHANA_MARKET.overview}\n\n**Local pricing:** ${GHANA_MARKET.localPricing}\n\n**Choosing a provider:** ${GHANA_MARKET.whatToLookFor}\n\n**Compliance:** ${GHANA_MARKET.compliance}\n\n${GHANA_MARKET.cities}`,
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
    id: 'faq-basics',
    keywords: ['what is a website', 'what is', 'explain', 'meaning', 'define', 'cms', 'content management', 'why do i need a website', 'need a website', 'benefits of a website'],
    weight: 0.8,
    answer: () =>
      `Here are the basics:\n\n- **Domain:** ${WEB_BASICS.domain}\n- **Hosting:** ${WEB_BASICS.hosting}\n- **SSL:** ${WEB_BASICS.ssl}\n- **CMS:** ${WEB_BASICS.cms}\n- **Responsive design:** ${WEB_BASICS.responsive}\n- **SEO:** ${WEB_BASICS.seo}\n\nA professional website builds trust, lets customers find you on Google, accepts payments 24/7 and works as your best salesperson. ${CONTACT_LINE}`,
  },
];

const FALLBACK = () =>
  `I'm not certain about that one. I can help with ${COMPANY.name} services, pricing, payment options (including Paystack USSD *415*3370#), timelines, portfolio, courses and general web development questions, including how Ghana compares with other countries.\n\nFor anything specific to your project, ${CONTACT_LINE.charAt(0).toLowerCase()}${CONTACT_LINE.slice(1)}`;

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

  const ranked = TOPICS.map((t) => ({ t, score: scoreTopic(t, text) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  let reply;
  if (!ranked.length) {
    reply = FALLBACK();
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
