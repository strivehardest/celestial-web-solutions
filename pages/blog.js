import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Calendar, Clock, User, ArrowRight, Tag, Search, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import PremiumCTA from '../components/PremiumCTA';
import WhatsAppButton from '../components/WhatsAppButton';
import GoogleAd from '../components/GoogleAd';
import { image } from "framer-motion/client";

// Blog articles data with external images - sorted by date (newest first)
export const blogArticles = [
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
    featured: true,
    tags: ["UI/UX Design", "User Experience", "Web Design", "Ghana", "Conversion Optimization"],
    hashtags: ["#UIUXDesign", "#WebDesignGhana", "#UserExperience", "#GhanaWeb", "#CelestialWebSolutions"]
  },
];

export default function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9); // Show 9 articles initially

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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory, debouncedSearch]);

  // Get unique categories
  const categories = ["All", ...new Set(blogArticles.map(article => article.category))];

  // Debounce search input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Enhanced search function with better matching
  const searchArticles = (articles, query) => {
    if (!query.trim()) return articles;
    
    const searchTerms = query.toLowerCase().trim().split(' ').filter(term => term.length > 0);
    
    return articles.filter(article => {
      // Check if searching for a hashtag
      const isHashtagSearch = searchTerms.length === 1;
      
      if (isHashtagSearch) {
        const searchTerm = searchTerms[0];
        // For hashtag/tag searches, look for exact matches in tags or hashtags
        const tags = (article.tags || []).map(t => t.toLowerCase());
        const hashtags = (article.hashtags || []).map(h => h.toLowerCase().replace('#', ''));
        
        return tags.includes(searchTerm) || hashtags.includes(searchTerm);
      }
      
      // For regular text search, search all content
      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        article.author,
        ...(article.tags || [])
      ].join(' ').toLowerCase();
      
      // Article matches if it contains all search terms (AND logic)
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  // Filter articles by category and search query with useMemo for optimization
  const filteredArticles = useMemo(() => {
    let filtered = blogArticles;
    
    // If searching, search across all articles regardless of category
    if (debouncedSearch.trim()) {
      filtered = searchArticles(blogArticles, debouncedSearch);
    } else if (selectedCategory !== "All") {
      // Only filter by category if not searching
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    // Always show newest first across all views
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, debouncedSearch]);

  const featuredArticles = useMemo(() => {
    let featured = blogArticles
      .filter(article => article.featured)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);
    
    // If searching, filter featured articles by search query too
    if (debouncedSearch.trim()) {
      featured = searchArticles(featured, debouncedSearch);
    }
    
    return featured;
  }, [debouncedSearch]);
  
  // All filtered articles (for counting)
  const allFilteredArticles = filteredArticles;
  
  // Visible articles (limited by visibleCount)
  const regularArticles = filteredArticles.slice(0, visibleCount);
  
  // Check if there are more articles to show
  const hasMoreArticles = filteredArticles.length > visibleCount;
  const remainingCount = filteredArticles.length - visibleCount;
  const popularTags = [...new Set(blogArticles.flatMap(a => a.tags || []))];

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("All");
  };

  return (
    <>
      <Head>
        <title>Expert Web Design & Digital Marketing Blog | Celestial Web Solutions Ghana</title>
        <meta name="description" content="Explore expert insights on web design, SEO, digital marketing, and technology trends. Ghana's leading resource for business growth and online success." />
        <meta name="keywords" content="ghana web design blog, accra web development, ghana seo tips, digital marketing ghana, web design prices ghana, mobile money integration, e-commerce ghana, website security ghana, content marketing ghana, best web designer accra, web development tutorials, AI technology ghana, web design trends 2025, affordable web design ghana" />
        <meta property="og:title" content="Web Design & Digital Marketing Blog | Celestial Web Solutions Ghana" />
        <meta property="og:description" content="Expert insights on web design, SEO, digital marketing, and technology trends from Ghana's leading web agency." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://celestialwebsolutions.com/blog" />
        {/* CollectionPage Schema for blog listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Blog - Celestial Web Solutions",
              "description": "Expert insights on web design, SEO, digital marketing, and technology trends from Ghana's leading web agency.",
              "url": "https://celestialwebsolutions.net/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Celestial Web Solutions",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://celestialwebsolutions.net/logo.png"
                }
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://www.expandgh.com/wp-content/uploads/2017/11/blog-1.jpg" 
              alt="Portfolio Background"
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
                Our Blog
              </h1>
              <p
                className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Expert insights on web design, development, SEO, and the latest technology trends in Ghana and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, keyword, author, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none transition-colors"
                  style={{ fontFamily: "Google Sans, sans-serif" }}
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                )}
              </div>
              {searchQuery && debouncedSearch !== searchQuery && (
                <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Searching...
                </div>
              )}
            </div>
            
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'
                  }`}
                  style={{ fontFamily: "Google Sans, sans-serif" }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Featured Articles
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="cursor-pointer">
                      <Link href={`/blog/${article.slug}`} className="block">
                        <div>
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                {article.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-8">
                            <h3 
                              className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                            >
                              {article.title}
                            </h3>

                            <p 
                              className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {article.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {article.readTime}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <User className="w-4 h-4" />
                                {article.author}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <PremiumCTA
                        size="small"
                        variant="primary"
                        className="block !px-4 !py-2 !text-sm w-full text-center mt-4"
                        icon={false}
                        href={`/blog/${article.slug}`}
                      >
                        <span className="flex items-center gap-2 justify-center">
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </PremiumCTA>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Google Ad - After Featured Articles */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <GoogleAd slot="5430272990" format="horizontal" />
          </div>
        </section>

        {/* All Articles */}
        {regularArticles.length > 0 ? (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  {debouncedSearch.trim() 
                    ? `Search Results` 
                    : selectedCategory === "All" 
                    ? "All Articles" 
                    : `${selectedCategory} Articles`}
                </motion.h2>
                {(debouncedSearch.trim() || selectedCategory !== "All") && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleResetFilters}
                    className="px-4 py-2 text-sm font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    Clear Filters
                  </motion.button>
                )}
              </div>
              {debouncedSearch.trim() && (
                <p className="text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Found {allFilteredArticles.length} {allFilteredArticles.length === 1 ? 'article' : 'articles'} matching "{debouncedSearch}"
                </p>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="cursor-pointer">
                      <Link href={`/blog/${article.slug}`} className="block">
                        <div>
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {article.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 
                              className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2"
                              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                            >
                              {article.title}
                            </h3>

                            <p 
                              className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {article.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <PremiumCTA
                        size="small"
                        variant="primary"
                        className="block px-6 pb-6 !py-2 !text-sm w-full text-center"
                        icon={false}
                        href={`/blog/${article.slug}`}
                      >
                        <span className="flex items-center gap-2 justify-center">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </PremiumCTA>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* View Older Posts Button */}
              {hasMoreArticles && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setVisibleCount(prev => prev + 9)}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    <span>View Older Posts</span>
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm rounded-full">
                      {remainingCount} more
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Show All / Show Less when all are visible */}
              {!hasMoreArticles && allFilteredArticles.length > 9 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setVisibleCount(9)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    <span>Show Less</span>
                  </button>
                </motion.div>
              )}

              {/* Google Ad - After Articles Grid */}
              <div className="mt-12">
                <GoogleAd slot="5430272990" format="auto" />
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  No Results Found
                </h3>
                <p 
                  className="text-gray-600 dark:text-gray-400 mb-6"
                  style={{ fontFamily: "Google Sans, sans-serif" }}
                >
                  {debouncedSearch.trim() 
                    ? <>We couldn\'t find any matches for <span className="font-semibold">"{debouncedSearch}"</span>. Try a different keyword or pick from suggestions below.</>
                    : `No articles in this category yet. Browse our featured content below.`}
                </p>

                {/* Suggestions: Categories */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3" style={{ fontFamily: "Google Sans, sans-serif" }}>Browse by category</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.slice(0, 8).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm font-semibold"
                        style={{ fontFamily: "Google Sans, sans-serif" }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions: Popular tags */}
                {popularTags.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3" style={{ fontFamily: "Google Sans, sans-serif" }}>Try a popular tag</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {popularTags.slice(0, 10).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40 transition-colors text-xs font-semibold"
                          style={{ fontFamily: "Google Sans, sans-serif" }}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-full border border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold transition-colors"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    Clear Filters
                  </button>
                  <Link href="/blog">
                    <span className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors inline-block" style={{ fontFamily: "Google Sans, sans-serif" }}>
                      View All Articles
                    </span>
                  </Link>
                </div>
              </div>

              {/* Featured suggestions */}
              {featuredArticles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Featured Articles</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArticles.slice(0, 3).map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <Link href={`/blog/${article.slug}`} className="block">
                          <div className="relative h-40 overflow-hidden">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3">
                              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{article.category}</span>
                            </div>
                          </div>
                          <div className="p-5">
                            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{article.title}</h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2" style={{ fontFamily: "Google Sans, sans-serif" }}>{article.excerpt}</p>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop" 
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-red-500/90"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Ready to Start Your Project?
              </h2>
              <p
                className="text-xl text-orange-100 mb-8"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Let's create something amazing together. Contact us for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PremiumCTA href="/contact" size="default" variant="primary">
                  Get Started Today
                </PremiumCTA>
                <PremiumCTA href="/web-design-company-in-ghana" size="default" variant="primary">
                  View Our Services
                </PremiumCTA>
              </div>
            </motion.div>
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
}