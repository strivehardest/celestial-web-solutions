import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import projects from "../data/projects";
import WhatsAppButton from '../components/WhatsAppButton';

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  // Enhanced categories to match various service types
  const categories = [
    "all",
    "business & corporate",
    "e-commerce & retail",
    "portfolio & personal",
    "news & media",
    "educational institutions",
    "ngos & nonprofits",
    "churches & religious",
    "finance & banking",
    "healthcare & wellness",
    "real estate & construction",
    "restaurants & hospitality",
    "marketplace & classifieds"
  ];

  // Enhanced filtering logic
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => {
        const title = p.title.toLowerCase();
        const description = p.description.toLowerCase();
        const searchTerm = filter.toLowerCase();
        
        // Custom matching logic for different categories
        switch(filter) {
          case "business & corporate":
            return title.includes("business") || title.includes("solutions") || 
                   title.includes("corporate") || title.includes("company") ||
                   description.includes("business") || description.includes("corporate") ||
                   title.includes("web solutions") || title.includes("planner");
          
          case "finance & banking":
            return title.includes("bank") || title.includes("finance") || 
                   title.includes("financial") || title.includes("investment") ||
                   description.includes("banking") || description.includes("financial");
          
          case "healthcare & wellness":
            return title.includes("health") || title.includes("medical") || 
                   title.includes("clinic") || title.includes("hospital") ||
                   title.includes("wellness") || description.includes("healthcare") ||
                   description.includes("medical");
          
          case "real estate & construction":
            return title.includes("real estate") || title.includes("property") || 
                   title.includes("building") || title.includes("construction") ||
                   title.includes("planner") || description.includes("building") ||
                   description.includes("construction") || description.includes("planning");
          
          case "restaurants & hospitality":
            return title.includes("restaurant") || title.includes("hotel") || 
                   title.includes("cafe") || title.includes("hospitality") ||
                   title.includes("catering") || description.includes("restaurant") ||
                   description.includes("food") || description.includes("hospitality");
          
          case "educational institutions":
            return title.includes("school") || title.includes("university") || 
                   title.includes("college") || title.includes("education") ||
                   description.includes("educational");
          
          case "ngos & nonprofits":
            return title.includes("ngo") || title.includes("nonprofit") || 
                   title.includes("foundation") || title.includes("charity") ||
                   description.includes("nonprofit") || description.includes("ngo");
          
          case "churches & religious":
            return title.includes("church") || title.includes("ministry") || 
                   title.includes("chapel") || title.includes("chaplain") ||
                   description.includes("church") || description.includes("ministry") ||
                   description.includes("chaplain") || description.includes("motivational speaker");
          
          case "news & media":
            return title.includes("news") || title.includes("media") || 
                   title.includes("updates") || description.includes("news") ||
                   description.includes("radio") || description.includes("streaming");
          
          case "marketplace & classifieds":
            return title.includes("marketplace") || title.includes("classified") ||
                   title.includes("adbay") || description.includes("marketplace") ||
                   description.includes("buy and sell") || description.includes("classified");
          
          case "e-commerce & retail":
            return title.includes("commerce") || title.includes("shop") || 
                   title.includes("store") || description.includes("e-commerce") ||
                   description.includes("woocommerce") || description.includes("online booking") ||
                   description.includes("payment");
          
          case "portfolio & personal":
            return title.includes("portfolio") || description.includes("portfolio") ||
                   title.includes("personal");
          
          default:
            return title.includes(searchTerm) || description.includes(searchTerm);
        }
      });

  return (
    <>
      <Head>
        <title>Portfolio | Celestial Web Solutions - Our Recent Projects</title>
        <meta name="description" content="Explore our portfolio of successful web development projects. See how we've helped businesses, NGOs, churches, educational institutions and more grow with custom websites, e-commerce solutions, and digital platforms." />
        <meta name="keywords" content="web development portfolio, website projects, e-commerce websites, Ghana web projects, Celestial Web Solutions work, NGO websites, church websites, educational websites" />
        <link rel="canonical" href="https://celestialwebsolutions.net/portfolio" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
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
                Our Portfolio
              </h1>
              <p
                className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Explore our collection of successful projects. From stunning websites to powerful e-commerce platforms, churches, NGOs, and educational institutions - see how we bring ideas to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  filter === category
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>

          {/* Two Column Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View Project Badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg">
                          View Project →
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
                        style={{ fontFamily: "Quicksand, sans-serif" }}
                      >
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech && project.tech.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium"
                            style={{ fontFamily: "Quicksand, sans-serif" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech && project.tech.length > 3 && (
                          <span
                            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full font-medium"
                            style={{ fontFamily: "Quicksand, sans-serif" }}
                          >
                            +{project.tech.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p
                className="text-gray-500 dark:text-gray-400 text-lg"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                No projects found in this category yet. Check back soon!
              </p>
            </motion.div>
          )}

          {/* Start a Project CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Ready to Start Your Project?
              </h2>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed text-lg"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Let's create something amazing together. Whether it's a website, e-commerce platform, or custom web application, we're here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Start a Project</span>
                </motion.a>
                <motion.a
                  href="/pricing"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>View Pricing</span>
                </motion.a>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-orange-100 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacing */}
        <div className="pb-20"></div>
      </div>
      <WhatsAppButton />
    </>
  );
}