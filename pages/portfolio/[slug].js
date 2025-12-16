import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import projects from "../../data/projects";
import WhatsAppButton from '../../components/WhatsAppButton';
import PremiumCTA from '../../components/PremiumCTA';

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageError, setImageError] = useState({});
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (slug) {
      const foundProject = projects.find((p) => p.slug === slug);
      setProject(foundProject);
    }
  }, [slug]);

  // Auto-scroll the screenshot image
  const handleImageClick = () => {
    if (!imageRef.current || !imageContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    setShowScrollButton(false);
    setScrollProgress(0);
    
    const container = imageContainerRef.current;
    const imageElement = imageRef.current;
    const imageHeight = imageElement.scrollHeight || imageElement.offsetHeight;
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

  const handleImageError = (idx) => {
    setImageError(prev => ({ ...prev, [idx]: true }));
  };

  if (!router.isReady || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading project...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Celestial Web Solutions - Project Details</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={`${project.title}, web development project, Celestial Web Solutions`} />
        <meta property="og:title" content={`${project.title} | Celestial Web Solutions`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={project.image} />
        <link rel="canonical" href={`https://celestialwebsolutions.net/portfolio/${slug}`} />

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
              "datePublished": project.completionDate || project.date || "2025-01-01"
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Link */}
              <Link href="/portfolio" className="text-white/80 hover:text-white mb-8 inline-flex items-center gap-2 transition font-medium hover:translate-x-[-4px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
              </Link>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {project.title}
              </h1>
              
              <p
                className="text-lg sm:text-xl text-orange-100 max-w-3xl leading-relaxed mb-8"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                {project.description}
              </p>

              {/* Project Meta Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {project.category && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Category</p>
                    <p className="text-white font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.category}</p>
                  </div>
                )}
                {project.client && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Client</p>
                    <p className="text-white font-semibold truncate" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.client}</p>
                  </div>
                )}
                {project.clientCountry && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Country</p>
                    <p className="text-white font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.clientCountry}</p>
                  </div>
                )}
                {project.duration && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Duration</p>
                    <p className="text-white font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.duration}</p>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Completed</p>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>{formatDate(project.completionDate || project.date)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>

          {/* Full Page Screenshot Section */}
          {project.screenshot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                Full Page Preview
              </h2>
              
              <div className="relative group">
                <motion.div
                  className="cursor-pointer relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg"
                  onClick={handleImageClick}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div 
                    ref={imageContainerRef}
                    className="relative h-[500px] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
                  >
                    <div ref={imageRef}>
                      <Image
                        src={project.screenshot}
                        alt={`${project.title} - Full Page Screenshot`}
                        width={1200}
                        height={3000}
                        className="object-contain object-top w-full"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Overlay and Progress Indicator */}
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
                            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700/50" />
                            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`} className="text-orange-500 transition-all duration-100" strokeLinecap="round" />
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
            </motion.div>
          )}

          {/* Features Section */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200 dark:border-gray-600"
            >
              <h3
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
                  >
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {project.techLogos && project.techLogos.length > 0 ? (
                project.techLogos.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-orange-200 dark:border-gray-500"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                      {!imageError[idx] ? (
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          width={56}
                          height={56}
                          className="max-w-full max-h-full object-contain"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                          onError={() => handleImageError(idx)}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-lg font-bold">
                          {tech.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <span
                      className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                ))
              ) : (
                project.tech && project.tech.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-orange-200 dark:border-gray-500"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-lg font-bold">
                      {tech.charAt(0)}
                    </div>
                    <span
                      className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      {tech}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Project Timeline */}
          {(project.timeline || project.duration || project.startDate) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600"
            >
              <h3
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Project Timeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.startDate && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Start Date:</span>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{formatDate(project.startDate)}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Completion Date:</span>
                  <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{formatDate(project.completionDate || project.date)}</p>
                </div>
                {project.duration && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Duration:</span>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.duration}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Client:</span>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.client}</p>
                  </div>
                )}
                {project.clientCountry && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Country:</span>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{project.clientCountry}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Development Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
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
                    <h4 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{phase.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section - Replace old buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl p-8 sm:p-12 shadow-2xl text-center"
          >
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Interested in a Similar Project?
            </h3>
            <p
              className="text-orange-100 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            >
              Let's bring your vision to life with cutting-edge technology and creative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {project.link && (
                <PremiumCTA href={project.link} variant="secondary" size="large" external>
                  Visit Website
                </PremiumCTA>
              )}
              <PremiumCTA href="/contact" variant="primary" size="large">
                Start Your Project
              </PremiumCTA>
            </div>
          </motion.div>
        </section>

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </>
  );
}