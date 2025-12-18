import Head from "next/head";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import PremiumCTA from '../components/PremiumCTA';
import WhatsAppButton from '../components/WhatsAppButton';
import { image } from "framer-motion/client";

// Blog articles data with external images
const blogArticles = [
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
    tags: ["web design", "Accra", "Ghana", "top agencies"]
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
    tags: ["pricing", "web design", "Ghana", "cost guide"]
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
    tags: ["business growth", "digital presence", "Ghana", "website benefits"]
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
    tags: ["SEO", "local SEO", "Ghana", "Google ranking"]
  },
  {
    id: 5,
    slug: "ai-tools-web-development-2025",
    title: "Top 15 AI Tools Revolutionizing Web Development in 2025",
    excerpt: "Explore the latest AI-powered tools transforming web development. From code generation to design automation, discover how AI is making development faster and more efficient.",
    category: "AI & Technology",
    author: "Celestial Team",
    date: "February 20, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["AI", "web development", "automation", "tools"]
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
    tags: ["web development", "frameworks", "tools", "React", "Next.js"]
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
    tags: ["mobile money", "e-commerce", "Ghana", "payment integration"]
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
    tags: ["responsive design", "mobile-first", "CSS", "best practices"]
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
    image: "https://verpex.com/assets/uploads/images/blog/AI-in-Web-Development.webp?v=1675753194",
    featured: false,
    tags: ["ChatGPT", "AI", "web development", "productivity"]
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
    tags: ["security", "cybersecurity", "Ghana", "website protection"]
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
    tags: ["e-commerce", "trends", "Ghana", "online shopping"]
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
    tags: ["Google Ads", "SEO", "digital marketing", "Ghana"]
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
    tags: ["content marketing", "Ghana", "digital strategy", "engagement"]    
  },
];

// Get unique categories
const categories = ["All", ...new Set(blogArticles.map(article => article.category))];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredArticles, setFilteredArticles] = useState(blogArticles);

  useEffect(() => {
    // Remove document.title manipulation since we'll use Next.js Head
  }, []);

  // Filter articles by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredArticles(blogArticles);
    } else {
      setFilteredArticles(blogArticles.filter(article => article.category === selectedCategory));
    }
  }, [selectedCategory]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Expert insights on web design, development, SEO, and the latest technology trends in Ghana and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
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
                  style={{ fontFamily: "Quicksand, sans-serif" }}
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
                    <Link href={`/blog/${article.slug}`}>
                      <div className="cursor-pointer">
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
                            style={{ fontFamily: 'Quicksand, sans-serif' }}
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
                            <span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 transition-all">
                              Read More
                              <ArrowRight className="w-5 h-5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        {regularArticles.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </motion.h2>

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
                    <Link href={`/blog/${article.slug}`}>
                      <div className="cursor-pointer">
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
                            style={{ fontFamily: 'Quicksand, sans-serif' }}
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

                          <span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Results Message */}
        {filteredArticles.length === 0 && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                No articles found in this category
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8" style={{ fontFamily: "Quicksand, sans-serif" }}>
                Try selecting a different category to explore more content.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                View All Articles
              </button>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500">
          <div className="max-w-4xl mx-auto px-4 text-center">
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
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Let's create something amazing together. Contact us for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PremiumCTA href="/contact" size="default" variant="primary">
                  Get Started Today
                </PremiumCTA>
                <PremiumCTA href="/services" size="default" variant="primary">
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