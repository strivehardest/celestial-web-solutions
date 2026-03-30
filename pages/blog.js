import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Calendar, Clock, User, ArrowRight, Search, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import WhatsAppButton from '../components/WhatsAppButton';
import GoogleAd from '../components/GoogleAd';

// Blog articles data with external images - sorted by date (newest first)
export const blogArticles = [
  {
    id: 2026,
    slug: "web-design-prices-in-ghana-2026",
    title: "Web Design Prices in Ghana 2026: The Complete Honest Guide",
    excerpt: "Wondering how much a website costs in Ghana in 2026? Get the full breakdown of web design prices in Ghana, what affects cost, and what Celestial Web Solutions charges.",
    category: "Web Design",
    author: "Celestial Team",
    date: "March 23, 2026",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Web design prices in Ghana 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web design", "pricing", "Ghana", "2026", "cost guide"],
    hashtags: ["#WebDesignGhana", "#WebDesignPricing", "#GhanaWeb", "#WebsiteCost", "#CelestialWebSolutions"],
    metaTitle: "Web Design Prices in Ghana 2026 – Full Pricing Breakdown",
    metaDescription: "Wondering how much a website costs in Ghana in 2026? Get the full breakdown of web design prices in Ghana, what affects cost, and what Celestial Web Solutions charges.",
    targetKeyword: "web design prices in Ghana 2026"
  },
  {
    id: 2027,
    slug: "why-every-business-needs-a-website-in-ghana-2026",
    title: "Why Every Business in Ghana Needs a Website in 2026",
    excerpt: "Still running your business without a website in 2026? Here's why every business in Ghana needs a professional website — and what you're losing without one.",
    category: "Business",
    author: "Celestial Team",
    date: "March 23, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
    alt: "Why every business needs a website in Ghana 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["business", "website", "Ghana", "2026", "digital transformation"],
    hashtags: ["#GhanaBusiness", "#WebsiteGhana", "#DigitalTransformation", "#CelestialWebSolutions"],
    metaTitle: "Why Every Business in Ghana Needs a Website in 2026",
    metaDescription: "Still running your business without a website in 2026? Here's why every business in Ghana needs a professional website — and what you're losing without one.",
    targetKeyword: "why every business needs a website in Ghana 2026"
  },
  {
    id: 1020,
    slug: "best-web-design-companies-in-ghana-2026",
    title: "12 Best Web Design Companies in Ghana (2026) — Reviewed & Ranked",
    excerpt: "Looking for the best web design company in Ghana? We ranked and reviewed the top 12 agencies based on portfolio quality, client reviews, SEO expertise, and industry recognition on Clutch, DesignRush, and Shortlister.",
    category: "Web Design",
    author: "Celestial Team",
    date: "March 3, 2026",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    alt: "Web design and development blog - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web design", "Ghana", "best companies", "Clutch", "DesignRush", "2026"],
    hashtags: ["#WebDesignGhana", "#BestWebDesignCompany", "#GhanaTech", "#CelestialWebSolutions", "#WebDevelopmentGhana"]
  },
  {
    id: 5,
    slug: "ai-tools-web-development-2026",
    title: "Top 15 AI Tools Revolutionizing Web Development in 2026",
    excerpt: "Explore the latest AI-powered tools transforming web development. From code generation to design automation, discover how AI is making development faster and more efficient.",
    category: "AI & Technology",
    author: "Celestial Team",
    date: "January 10, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    alt: "AI tools transforming web development - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["AI", "web development", "automation", "tools"],
    hashtags: ["#AITools", "#WebDev", "#ArtificialIntelligence", "#CodingTools", "#TechGhana"]
  },
  {
    id: 14,
    slug: "how-to-choose-best-web-design-company-ghana-2026",
    title: "How to Choose the Best Web Design Company in Ghana (2026 Guide)",
    excerpt: "Learn what to look for when hiring a web design company in Ghana. Discover key factors like experience, SEO optimization, mobile responsiveness, and transparent pricing.",
    category: "Web Design",
    author: "Celestial Team",
    date: "January 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=600&fit=crop",
    alt: "Choosing the best web design company in Ghana - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web design", "Ghana", "choosing company", "guide", "2026"],
    hashtags: ["#WebDesignGhana", "#ChooseWebDesigner", "#GhanaDigital", "#TechGuide", "#WebDevelopment"]
  },
  {
    id: 1001,
    slug: "web-design-trends-ghana-world-2026",
    title: "Web Design Trends Businesses in Ghana and Worldwide Should Prepare for in 2026",
    excerpt: "Stay ahead in 2026! Discover the top web design trends for Ghanaian and global businesses: AI-driven personalization, minimal UIs, speed, voice optimization, and accessibility.",
    category: "Web Design",
    author: "Celestial Team",
    date: "December 29, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1635405050330-b0824eb1bf26?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Web design trends for Ghanaian and global businesses in 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web design", "trends", "AI", "accessibility", "2026"],
    hashtags: ["#WebDesign2026", "#GhanaBusiness", "#DigitalTrends", "#CelestialWebSolutions"]
  },
  {
    id: 1002,
    slug: "future-ready-website-ghana-international-2026",
    title: "Building a Future-Ready Website for Ghanaian and International Markets in 2026",
    excerpt: "Learn how to build a website that grows your business in Ghana and globally in 2026: scalable architecture, security, global payments, SEO, and easy content management.",
    category: "Web Development",
    author: "Celestial Team",
    date: "December 29, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Building a future-ready website for Ghanaian and international markets in 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["future-ready", "global", "Ghana", "website", "2026"],
    hashtags: ["#FutureReady", "#GhanaWeb", "#InternationalBusiness", "#CelestialWebSolutions"]
  },
  {
    id: 1,
    slug: "best-web-designers-in-accra-ghana-2025",
    title: "Best Web Designers in Accra, Ghana 2025: Top 10 Agencies Reviewed",
    excerpt: "Looking for the best web designers in Accra? Discover the top web design agencies in Ghana, including Celestial Web Solutions, offering professional, affordable, and stunning website designs.",
    category: "Web Design",
    author: "Celestial Team",
    date: "November 4, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=600&fit=crop",
    alt: "Best web designers in Accra, Ghana 2025 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web design", "Accra", "Ghana", "top agencies"],
    hashtags: ["#WebDesignGhana", "#AccraWebDesigners", "#GhanaDigital", "#WebDesignAccra", "#CelestialWebSolutions"]
  },
  {
    id: 13,
    slug: "content-marketing-strategies-ghana-2025",
    title: "Content Marketing Strategies for Ghanaian Businesses in 2025",
    excerpt: "Boost your online presence with effective content marketing. Learn strategies tailored for Ghanaian audiences to increase engagement and drive sales.",
    category: "Digital Marketing",
    author: "Celestial Team",
    date: "November 3, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    alt: "Content marketing strategies for Ghanaian businesses in 2025 - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["content marketing", "Ghana", "digital strategy", "engagement"],
    hashtags: ["#DigitalMarketingGhana", "#ContentMarketing", "#GhanaBusiness", "#MarketingStrategy"]
  },
  {
    id: 6,
    slug: "latest-web-development-tools-frameworks-2025",
    title: "Latest Web Development Tools & Frameworks You Must Know in 2025",
    excerpt: "Stay ahead of the curve with the newest web development tools and frameworks. A comprehensive guide to React 19, Next.js 15, and other cutting-edge technologies.",
    category: "Web Development",
    author: "Celestial Team",
    date: "October 15, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    alt: "Latest web development tools and frameworks in 2025 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["web development", "frameworks", "tools", "React", "Next.js"],
    hashtags: ["#WebDevelopment", "#ReactJS", "#NextJS", "#JavaScript", "#WebDevTools"]
  },
  {
    id: 2,
    slug: "web-design-prices-ghana-2025-complete-guide",
    title: "Web Design Prices in Ghana 2025: Complete Cost Breakdown Guide",
    excerpt: "Comprehensive guide to web design costs in Ghana. Learn about pricing for different types of websites, from basic business sites to e-commerce platforms, and what factors affect the final cost.",
    category: "Web Design",
    author: "Celestial Team",
    date: "March 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    alt: "Web design prices in Ghana 2025 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["pricing", "web design", "Ghana", "cost guide"],
    hashtags: ["#WebDesignPricing", "#GhanaPrices", "#WebsiteCost", "#AffordableWebDesign", "#GhanaWeb"]
  },
  {
    id: 3,
    slug: "why-every-business-needs-website-ghana",
    title: "Why Every Business in Ghana Needs a Website in 2025",
    excerpt: "Discover why having a professional website is no longer optional for Ghanaian businesses. Learn how a website can boost credibility, increase sales, and help you reach more customers.",
    category: "Business",
    author: "Celestial Team",
    date: "March 5, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["business growth", "digital presence", "Ghana", "website benefits"],
    hashtags: ["#GhanaBusiness", "#DigitalTransformation", "#WebsiteGhana", "#BusinessGrowth", "#OnlinePresence"]
  },
  {
    id: 4,
    slug: "seo-strategies-ghana-businesses-2025",
    title: "SEO Strategies for Ghanaian Businesses: Rank #1 on Google",
    excerpt: "Master local SEO in Ghana with proven strategies. Learn how to optimize your website for Ghanaian customers and dominate Google search results in your industry.",
    category: "SEO",
    author: "Celestial Team",
    date: "February 28, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop",
    alt: "SEO strategies for Ghanaian businesses to rank #1 on Google - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["SEO", "local SEO", "Ghana", "Google ranking"],
    hashtags: ["#SEOGhana", "#LocalSEO", "#GoogleRanking", "#DigitalMarketingGhana", "#SEOTips"]
  },
  {
    id: 7,
    slug: "mobile-money-integration-ghana-websites",
    title: "Mobile Money Integration for Ghana Websites: Complete Guide",
    excerpt: "Learn how to integrate MTN Mobile Money, Vodafone Cash, and AirtelTigo Money into your Ghanaian website. Step-by-step implementation guide with code examples.",
    category: "E-Commerce",
    author: "Celestial Team",
    date: "February 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
    alt: "Mobile Money integration for Ghanaian websites - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["mobile money", "e-commerce", "Ghana", "payment integration"],
    hashtags: ["#MobileMoney", "#PaymentGhana", "#MTNMoMo", "#VodafoneCash", "#EcommerceGhana"]
  },
  {
    id: 8,
    slug: "responsive-web-design-best-practices-2025",
    title: "Responsive Web Design Best Practices for 2025",
    excerpt: "Master responsive design with modern techniques. Learn about mobile-first approach, CSS Grid, Flexbox, and creating websites that look perfect on any device.",
    category: "Web Design",
    author: "Celestial Team",
    date: "February 5, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    alt: "Responsive web design best practices for 2025 - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["responsive design", "mobile-first", "CSS", "best practices"],
    hashtags: ["#ResponsiveDesign", "#MobileFirst", "#WebDesign", "#CSS", "#UXDesign"]
  },
  {
    id: 9,
    slug: "chatgpt-ai-impact-web-development",
    title: "How ChatGPT and AI are Transforming Web Development",
    excerpt: "Discover how AI tools like ChatGPT, GitHub Copilot, and Claude are changing the way developers code. Real examples and productivity tips included.",
    category: "AI & Technology",
    author: "Celestial Team",
    date: "January 30, 2025",
    readTime: "9 min read",
    image: "https://admin.fruxinfo.com/public/storage/blog/Fruxinfo-1766552749-694b74ad0024c.webp",
    alt: "How ChatGPT and AI are transforming web development - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["ChatGPT", "AI", "web development", "productivity"],
    hashtags: ["#ChatGPT", "#AIinTech", "#WebDevelopment", "#AIDevelopment", "#CodingAI"]
  },
  {
    id: 10,
    slug: "website-security-tips-ghana-businesses",
    title: "Website Security: Essential Tips for Ghanaian Businesses",
    excerpt: "Protect your business website from cyber threats. Learn about SSL certificates, secure hosting, data backup, and other crucial security measures.",
    category: "Security",
    author: "Celestial Team",
    date: "January 25, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    alt: "Website security tips for Ghanaian businesses - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["security", "cybersecurity", "Ghana", "website protection"],
    hashtags: ["#CyberSecurity", "#WebsiteSecurity", "#GhanaTech", "#DataProtection", "#SecureWebsite"]
  },
  {
    id: 11,
    slug: "e-commerce-trends-ghana-2025",
    title: "E-Commerce Trends in Ghana 2025: What's Driving Online Sales",
    excerpt: "Explore the latest e-commerce trends in Ghana. From social commerce to voice shopping, discover what's shaping the future of online retail.",
    category: "E-Commerce",
    author: "Celestial Team",
    date: "January 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    alt: "E-commerce trends in Ghana 2025 - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["e-commerce", "trends", "Ghana", "online shopping"],
    hashtags: ["#EcommerceGhana", "#OnlineShopping", "#DigitalRetail", "#GhanaTrends", "#EcommerceTrends"]
  },
  {
    id: 12,
    slug: "google-ads-vs-seo-ghana-businesses",
    title: "Google Ads vs SEO: Which is Better for Your Ghanaian Business?",
    excerpt: "Compare Google Ads and SEO for Ghanaian businesses. Learn the pros, cons, costs, and which strategy delivers better ROI for different business types.",
    category: "Digital Marketing",
    author: "Celestial Team",
    date: "January 15, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    alt: "Google Ads vs SEO for Ghanaian businesses - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["Google Ads", "SEO", "digital marketing", "Ghana"],
    hashtags: ["#GoogleAds", "#SEO", "#DigitalMarketing", "#PPC", "#GhanaMarketing"]
  },
  {
    id: 15,
    slug: "how-to-start-online-store-ghana",
    title: "How to Start an Online Store in Ghana: A Quick Guide",
    excerpt: "Learn the essential steps to launch your online store in Ghana, from choosing a platform to setting up payment methods and driving your first sales.",
    category: "E-Commerce",
    author: "Celestial Team",
    date: "January 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "How to start an online store in Ghana - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["E-commerce", "Ghana", "Online Business", "Startup"],
    hashtags: ["#EcommerceGhana", "#GhanaBusiness", "#OnlineStore", "#StartupTips", "#CelestialWebSolutions"]
  },
  {
    id: 16,
    slug: "wordpress-vs-custom-website-ghana-2026",
    title: "WordPress vs Custom Website: Which is Best for Your Ghanaian Business in 2026?",
    excerpt: "Confused about choosing between WordPress and a custom website? This comprehensive guide helps Ghanaian businesses make the right decision based on budget, features, and long-term goals.",
    category: "Web Development",
    author: "Celestial Team",
    date: "February 1, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=600&fit=crop",
    alt: "WordPress vs Custom Website for Ghanaian businesses in 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["WordPress", "Custom Development", "Web Development", "Ghana", "CMS"],
    hashtags: ["#WordPressGhana", "#CustomWebsite", "#WebDevelopment", "#GhanaBusiness", "#CelestialWebSolutions"]
  },
  {
    id: 17,
    slug: "ui-ux-design-principles-ghana-websites-2026",
    title: "UI/UX Design Principles Every Ghanaian Website Must Follow in 2026",
    excerpt: "Master the essential UI/UX design principles that make websites successful in Ghana. Learn how to create user-friendly, conversion-focused designs that work for Ghanaian users in 2026.",
    category: "Web Design",
    author: "Celestial Team",
    date: "February 1, 2026",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    alt: "UI/UX design principles for Ghanaian websites in 2026 - Celestial Web Solutions Ghana",
    featured: true,
    tags: ["UI/UX Design", "User Experience", "Web Design", "Ghana", "Conversion Optimization"],
    hashtags: ["#UIUXDesign", "#WebDesignGhana", "#UserExperience", "#GhanaWeb", "#CelestialWebSolutions"]
  },
  {
    id: 18,
    slug: "complete-guide-to-web-design-agencies-ghana",
    title: "The Complete Guide to Web Design Agencies in Ghana",
    excerpt: "Everything you need to know about choosing a web design agency in Ghana.",
    category: "Web Design",
    author: "Celestial Team",
    date: "January 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&h=600&fit=crop",
    alt: "Complete guide to web design agencies in Ghana - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["web design", "Ghana", "web development", "digital agencies"],
    hashtags: ["#WebDesignGhana", "#GhanaWebAgencies", "#DigitalMarketingGhana", "#WebDevelopment", "#CelestialWebSolutions"]
  },
  {
    id: 19,
    slug: "ultimate-guide-to-digital-marketing-ghana-2025",
    title: "The Ultimate Guide to Digital Marketing in Ghana 2025",
    excerpt: "Master digital marketing in Ghana with our comprehensive guide. Strategies, tips, and tools for success.",
    category: "Digital Marketing",
    author: "Celestial Team",
    date: "January 5, 2025",
    readTime: "12 min read",
    image: "https://plus.unsplash.com/premium_photo-1661425715124-310ec1b49b8a?q=80&w=1200&h=600&auto=format&fit=crop",
    alt: "Ultimate guide to digital marketing in Ghana 2025 - Celestial Web Solutions Ghana",
    featured: false,
    tags: ["digital marketing", "Ghana", "SEO", "social media", "email marketing"],
    hashtags: ["#DigitalMarketingGhana", "#SEOGhana", "#SocialMediaGhana", "#CelestialWebSolutions"]
  },
];

export default function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync search query from URL when coming from hashtag links
  useEffect(() => {
    if (!router.isReady) return;
    const { search } = router.query;
    if (typeof search === "string" && search.trim()) {
      const normalized = decodeURIComponent(search).replace(/^#/, "");
      setSearchQuery(normalized);
      setDebouncedSearch(normalized);
    }
  }, [router.isReady, router.query]);

  useEffect(() => { setVisibleCount(12); }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get unique categories
  const categories = useMemo(() => 
    ["All", ...new Set(blogArticles.map(a => a.category))], 
  []);

  // Sort all articles by date (newest first)
  const sortedArticles = useMemo(() => 
    [...blogArticles].sort((a, b) => new Date(b.date) - new Date(a.date)),
  []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = sortedArticles;

    if (debouncedSearch.trim()) {
      const terms = debouncedSearch.toLowerCase().trim().split(' ').filter(t => t.length > 0);
      filtered = filtered.filter(article => {
        if (terms.length === 1) {
          const term = terms[0];
          const tags = (article.tags || []).map(t => t.toLowerCase());
          const hashtags = (article.hashtags || []).map(h => h.toLowerCase().replace('#', ''));
          if (tags.includes(term) || hashtags.includes(term)) return true;
        }
        const text = [article.title, article.excerpt, article.category, ...(article.tags || [])].join(' ').toLowerCase();
        return terms.every(term => text.includes(term));
      });
    } else if (selectedCategory !== "All") {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    return filtered;
  }, [sortedArticles, selectedCategory, debouncedSearch]);

  // Format date for display
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return dateStr; }
  };

  // The hero article is the latest one
  const heroArticle = filteredArticles[0] || null;
  const remainingArticles = filteredArticles.slice(1, visibleCount + 1);
  const hasMore = filteredArticles.length > visibleCount + 1;
  const totalFiltered = filteredArticles.length;

  return (
    <>
      <Head>
        <title>Blog | Celestial Web Solutions — Web Design, SEO & Digital Marketing</title>
        <meta name="description" content="Read expert insights on web design, SEO, digital marketing, and technology trends. Ghana's leading resource for business growth and online success." />
        <meta name="keywords" content="ghana web design blog, accra web development, ghana seo tips, digital marketing ghana, web design prices ghana, mobile money integration, e-commerce ghana, website security ghana, best web designer accra, web development tutorials, AI technology ghana" />
        <meta property="og:title" content="Blog | Celestial Web Solutions" />
        <meta property="og:description" content="Expert insights on web design, SEO, digital marketing, and technology trends from Ghana's leading web agency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.celestialwebsolutions.net/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.celestialwebsolutions.net/blog" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Blog - Celestial Web Solutions",
              "description": "Expert insights on web design, SEO, digital marketing, and technology trends from Ghana's leading web agency.",
              "url": "https://www.celestialwebsolutions.net/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Celestial Web Solutions",
                "logo": { "@type": "ImageObject", "url": "https://www.celestialwebsolutions.net/logo.png" }
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* ─── Hero Section ─── */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=800&fit=crop&q=80"
              alt="Web design and development blog - Celestial Web Solutions Ghana"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 md:pt-40 pb-16 md:pb-24">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  Our Blog
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  The Celestial Blog
                </h1>
                <p
                  className="mt-4 text-lg md:text-xl text-gray-400 max-w-xl"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  Insights on web design, development, SEO, and digital trends — from our team in Accra to the world.
                </p>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&q=80"
                    alt="Person reading coding blog on laptop"
                    className="w-full h-72 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Search + Filters Bar ─── */}
        <section className="sticky top-[72px] md:top-[80px] z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search */}
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:focus:border-orange-400 outline-none transition-all"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); setDebouncedSearch(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    style={{ fontFamily: "Albert Sans, sans-serif" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {debouncedSearch.trim() && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                {totalFiltered} {totalFiltered === 1 ? 'result' : 'results'} for &ldquo;{debouncedSearch}&rdquo;
              </p>
            )}
          </div>
        </section>

        {/* ─── Hero / Featured Article ─── */}
        {heroArticle && (
          <section className="py-10 md:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <Link href={`/blog/${heroArticle.slug}`} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={heroArticle.image}
                      alt={heroArticle.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                        {heroArticle.category}
                      </span>
                      <span className="text-sm text-gray-400 dark:text-gray-500" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                        {formatDate(heroArticle.date)}
                      </span>
                    </div>

                    <h2
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors leading-tight"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      {heroArticle.title}
                    </h2>

                    <p
                      className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed line-clamp-3"
                      style={{ fontFamily: "Albert Sans, sans-serif" }}
                    >
                      {heroArticle.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {heroArticle.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {heroArticle.readTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </section>
        )}

        {/* ─── Article Grid ─── */}
        {remainingArticles.length > 0 && (
          <section className="pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />

              <div className="space-y-0">
                {remainingArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <Link href={`/blog/${article.slug}`} className="group block">
                      <article className="grid md:grid-cols-[1fr_280px] gap-6 md:gap-8 py-8 border-b border-gray-100 dark:border-gray-800 items-center">
                        {/* Text */}
                        <div className="order-2 md:order-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                              {article.category}
                            </span>
                            <span className="text-sm text-gray-400 dark:text-gray-500" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                              {formatDate(article.date)}
                            </span>
                          </div>

                          <h3
                            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors leading-snug"
                            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                          >
                            {article.title}
                          </h3>

                          <p
                            className="mt-2.5 text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed line-clamp-2"
                            style={{ fontFamily: "Albert Sans, sans-serif" }}
                          >
                            {article.excerpt}
                          </p>

                          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="order-1 md:order-2">
                          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                            />
                          </div>
                        </div>
                      </article>
                    </Link>

                    {/* Inject Google Ad after every 6th article */}
                    {(index + 1) % 6 === 0 && (
                      <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                        <GoogleAd slot="5430272990" format="horizontal" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:border-orange-400 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all duration-200"
                    style={{ fontFamily: "Albert Sans, sans-serif" }}
                  >
                    Load more articles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ─── Empty State ─── */}
        {filteredArticles.length === 0 && (
          <section className="py-24">
            <div className="max-w-md mx-auto px-4 text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                {debouncedSearch.trim()
                  ? <>No results for &ldquo;{debouncedSearch}&rdquo;. Try a different search term.</>
                  : "No articles in this category yet."}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setDebouncedSearch(""); setSelectedCategory("All"); }}
                className="px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ fontFamily: "Albert Sans, sans-serif" }}
              >
                View all articles
              </button>
            </div>
          </section>
        )}

        {/* ─── Newsletter / CTA ─── */}
        <section className="border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Ready to build something great?
              </h2>
              <p
                className="mt-3 text-gray-500 dark:text-gray-400 text-base"
                style={{ fontFamily: "Albert Sans, sans-serif" }}
              >
                Let&rsquo;s create a fast, beautiful website that grows your business. Get a free consultation today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/web-design-company-in-ghana"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
}