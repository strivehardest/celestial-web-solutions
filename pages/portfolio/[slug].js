import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import projects from "../../data/projects";
import WhatsAppButton from '../../components/WhatsAppButton';

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const project = projects.find((p) => p.slug === slug);

  // Auto-scroll the screenshot image
  const handleImageClick = () => {
    if (!imageRef.current || !imageContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    setShowScrollButton(false);
    setScrollProgress(0);
    
    const container = imageContainerRef.current;
    const image = imageRef.current;
    const imageHeight = image.offsetHeight;
    const containerHeight = container.offsetHeight;
    const maxScroll = imageHeight - containerHeight;
    
    if (maxScroll <= 0) {
      setIsScrolling(false);
      setShowScrollButton(true);
      return;
    }
    
    const startTime = Date.now();
    const duration = Math.max(3000, maxScroll * 3);
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeInOutCubic = progress => 
        progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const scrollTop = easeInOutCubic(progress) * maxScroll;
      container.scrollTop = scrollTop;
      setScrollProgress(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        setTimeout(() => {
          setShowScrollButton(true);
          setTimeout(() => {
            if (container) {
              container.scrollTop = 0;
            }
          }, 2000);
        }, 1000);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "2025";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (!slug) return <p className="text-center mt-10">Loading project...</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <>
      <Head>
        <title>{project.title} | Celestial Web Solutions - Project Details</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={`${project.title}, web development project, Celestial Web Solutions, responsive design, e-commerce`} />
        
        <meta property="og:title" content={`${project.title} | Celestial Web Solutions`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={project.image} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | Celestial Web Solutions`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={project.image} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "image": project.image,
              "creator": {
                "@type": "Organization",
                "name": "Celestial Web Solutions"
              },
              "datePublished": project.completionDate || project.date || "2025-01-01",
              "inLanguage": "en",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Portfolio"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": project.title
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Link */}
              <Link href="/portfolio" className="text-white/90 hover:text-white mb-6 inline-flex items-center gap-2 transition font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
              </Link>

              <h1
                className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {project.title}
              </h1>
              <p
                className="text-lg text-orange-100 max-w-3xl leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                {project.description}
              </p>

              {/* Project Meta Info */}
              <div className="mt-6 flex flex-wrap gap-4 text-orange-100">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{project.client}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{project.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(project.completionDate || project.date)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto p-6 py-12">
          {/* Project Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            {/* Original Thumbnail Image */}
            <div className="relative group mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="object-cover w-full rounded-lg"
                />
              </motion.div>
            </div>

            {/* Full Page Screenshot Section */}
            {project.screenshot && (
              <div className="mb-6">
                <h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Full Page Preview
                </h3>
                
                <div className="relative group">
                  <motion.div
                    className="cursor-pointer relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    onClick={handleImageClick}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      ref={imageContainerRef}
                      className="relative h-[500px] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
                    >
                      <Image
                        ref={imageRef}
                        src={project.screenshot}
                        alt={`${project.title} - Full Page Screenshot`}
                        width={1200}
                        height={3000}
                        className="object-contain object-top w-full"
                        priority
                      />
                    </div>
                    
                    {/* Overlay with scroll indication */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center pt-8 rounded-lg pointer-events-none">
                      <div className="text-white text-center">
                        <motion.div
                          animate={{ y: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-3xl mb-1"
                        >
                          ↓
                        </motion.div>
                        <p className="text-xs font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                          Click to scroll
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <AnimatePresence>
                      {isScrolling && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-4 right-4 pointer-events-none"
                        >
                          <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 transform -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                className="text-gray-700/50"
                              />
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 24}`}
                                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                                className="text-orange-500 transition-all duration-100"
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-orange-500 drop-shadow-lg">
                                {Math.round(scrollProgress)}%
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Scroll hint badge */}
                  <AnimatePresence>
                    {showScrollButton && !isScrolling && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-3 right-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Click to scroll
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Additional Content Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Features Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3
                  className="font-semibold text-xl text-gray-900 dark:text-white mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {project.features && project.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3
                  className="font-semibold text-xl text-gray-900 dark:text-white mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech && project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Project Timeline */}
              {(project.timeline || project.duration) && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3
                    className="font-semibold text-xl text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Project Timeline
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {project.startDate && (
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Start Date:</span>
                        <p className="text-gray-600 dark:text-gray-300">{formatDate(project.startDate)}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Completion Date:</span>
                      <p className="text-gray-600 dark:text-gray-300">{formatDate(project.completionDate || project.date)}</p>
                    </div>
                    {project.duration && (
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Duration:</span>
                        <p className="text-gray-600 dark:text-gray-300">{project.duration}</p>
                      </div>
                    )}
                    {project.client && (
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Client:</span>
                        <p className="text-gray-600 dark:text-gray-300">{project.client}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Development Process */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3
                  className="font-semibold text-xl text-gray-900 dark:text-white mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Development Process
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Planning & Research", desc: "Understanding client requirements and market analysis" },
                    { step: 2, title: "Design & Prototyping", desc: "Creating wireframes and visual designs" },
                    { step: 3, title: "Development", desc: "Building the application/website with modern technologies" },
                    { step: 4, title: "Testing & Deployment", desc: "Quality assurance and production deployment" }
                  ].map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {phase.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{phase.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{phase.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visit Website Button */}
            {project.link && (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Visit Website →
              </motion.a>
            )}
          </motion.div>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
}