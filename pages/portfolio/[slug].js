// ProjectVideo component for YouTube walkthrough
const ProjectVideo = ({ project }) => {
  if (!project.youtubeId) return null;

  const embedUrl = `https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1&color=white`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.18 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          Project Walkthrough
        </h2>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          YouTube
        </span>
      </div>

      {/* iMac frame with YouTube embed */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#1a1a1a', padding: '10px 10px 0' }}
      >
        {/* Mac traffic lights */}
        <div className="flex items-center gap-1.5 px-3 pb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* YouTube iframe — 16:9 */}
        <div className="rounded-t-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={embedUrl}
            title={`${project.title} - Project Walkthrough`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>

      {/* YouTube channel link */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        <a
          href="https://youtube.com/@celestialwebsolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          @celestialwebsolutions
        </a>
      </div>
    </motion.div>
  );
};
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import projects from "../../data/projects";
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, ArrowLeft, ExternalLink, Calendar, MapPin, User, Clock, Star, CheckCircle2, Code2, Layers, Rocket, Target, AlertCircle, Monitor, Smartphone } from 'lucide-react';

const GlassButton = ({ children, href, variant = 'light', className = '', external = false, onClick }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-md border";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl",
    dark: "bg-black/20 hover:bg-black/30 text-gray-900 dark:text-white border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40",
    orange: "bg-orange-500/90 hover:bg-orange-600 text-white border-orange-400/50 hover:border-orange-500 shadow-lg hover:shadow-orange-500/25",
    outline: "bg-transparent hover:bg-white/10 text-white border-white/50 hover:border-white"
  };
  const Component = href ? (external ? 'a' : Link) : 'button';
  const props = href ? (external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href }) : { onClick };
  return (
    <Component {...props} className={`${baseStyles} ${variants[variant]} ${className}`} style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
      {children}
    </Component>
  );
};

const DeviceMockup = ({ project }) => {
  const hasDesktop = project.desktopImage;
  const hasMobile = project.mobileImage;
  const [modal, setModal] = useState({ open: false, src: '', alt: '' });

  const openModal = (src, alt) => setModal({ open: true, src, alt });
  const closeModal = () => setModal({ open: false, src: '', alt: '' });

  // ✅ Lock body scroll + ESC key handler when modal is open
  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [modal.open]);

  if (!hasDesktop && !hasMobile) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Device Preview
          </h2>
          <div className="flex items-center gap-2">
            {hasDesktop && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full">
                <Monitor size={11} /> Desktop
              </span>
            )}
            {hasMobile && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full">
                <Smartphone size={11} /> Mobile
              </span>
            )}
          </div>
        </div>

        {hasDesktop && hasMobile ? (
          <div className="grid grid-cols-3 gap-4 items-start">

            {/* Desktop — 2/3 width */}
            <div className="col-span-2 space-y-2">
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 cursor-zoom-in group"
                style={{ paddingBottom: '62.5%' }}
                onClick={() => openModal(project.desktopImage, `${project.title} - Desktop`)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.desktopImage}
                    alt={`${project.title} - Desktop`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  {/* Zoom hint on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Click to expand
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Monitor size={13} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Desktop</span>
              </div>
            </div>

            {/* Mobile — 1/3 width */}
            <div className="col-span-1 space-y-2">
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 cursor-zoom-in group"
                style={{ paddingBottom: '177%' }}
                onClick={() => openModal(project.mobileImage, `${project.title} - Mobile`)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} - Mobile`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Click to expand
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Smartphone size={13} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Mobile</span>
              </div>
            </div>
          </div>

        ) : hasDesktop ? (
          <div className="space-y-2">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 cursor-zoom-in group"
              style={{ paddingBottom: '56.25%' }}
              onClick={() => openModal(project.desktopImage, `${project.title} - Desktop`)}
            >
              <div className="absolute inset-0">
                <Image
                  src={project.desktopImage}
                  alt={`${project.title} - Desktop`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Click to expand
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <Monitor size={13} className="text-gray-400" />
              <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Desktop</span>
            </div>
          </div>

        ) : (
          <div className="flex justify-center">
            <div className="w-56 space-y-2">
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 cursor-zoom-in group"
                style={{ paddingBottom: '177%' }}
                onClick={() => openModal(project.mobileImage, `${project.title} - Mobile`)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} - Mobile`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Click to expand
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Smartphone size={13} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Mobile</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* ✅ Self-contained Modal — click anywhere (including image) to close */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 cursor-pointer"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* ✅ Close button — top right, large & clearly visible */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-20 w-12 h-12 bg-white/20 hover:bg-red-500 border-2 border-white/40 hover:border-red-400 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-red-500/30"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image container — clicking image also closes modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center group cursor-pointer"
            >
              <img
                src={modal.src}
                alt={modal.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[0.98]"
              />
              {/* Hover overlay on image with close hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Click to close
                </div>
              </div>
            </motion.div>

            {/* ESC hint */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm font-medium" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
              Click anywhere or press ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- SSG: Pre-render all portfolio pages at build time ---
export async function getStaticPaths() {
  const paths = projects.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const foundIndex = projects.findIndex((p) => p.slug === slug);
  if (foundIndex === -1) {
    return { notFound: true };
  }
  return {
    props: {
      project: projects[foundIndex],
      currentIndex: foundIndex,
      prevProject: foundIndex > 0 ? { slug: projects[foundIndex - 1].slug, title: projects[foundIndex - 1].title } : null,
      nextProject: foundIndex < projects.length - 1 ? { slug: projects[foundIndex + 1].slug, title: projects[foundIndex + 1].title } : null,
    },
  };
}

export default function ProjectDetail({ project, currentIndex, prevProject: prevProjectNav, nextProject: nextProjectNav }) {
  const router = useRouter();
  const [notFound, setNotFound] = useState(!project);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageError, setImageError] = useState({});
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  // ✅ Add ESC key support (closes any open modals via DeviceMockup's internal state)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        // closes any open modals via the DeviceMockup's internal state
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const prevProject = prevProjectNav || (currentIndex > 0 ? projects[currentIndex - 1] : null);
  const nextProject = nextProjectNav || (currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null);

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
    if (maxScroll <= 0) { setIsScrolling(false); setShowScrollButton(true); return; }
    const startTime = Date.now();
    const duration = Math.max(3000, maxScroll * 3);
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutCubic = p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      container.scrollTop = easeInOutCubic(progress) * maxScroll;
      setScrollProgress(progress * 100);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        setTimeout(() => {
          setShowScrollButton(true);
          setTimeout(() => { if (container) container.scrollTop = 0; }, 2000);
        }, 1000);
      }
    };
    requestAnimationFrame(animateScroll);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "In Progress") return "In Progress";
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateString; }
  };

  const handleImageError = (idx) => setImageError(prev => ({ ...prev, [idx]: true }));

  if (notFound) {
    return (
      <>
        <Head>
          <title>Project Not Found | Celestial Web Solutions</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: 'Albert Sans, sans-serif' }}>The project you're looking for doesn't exist or may have been removed.</p>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              <ArrowLeft size={20} /> Back to Portfolio
            </Link>
          </div>
        </div>
        <WhatsAppButton />
      </>
    );
  }

  const currentUrl = `https://celestialwebsolutions.net/portfolio/${project.slug}`;

  return (
    <>
      <Head>
        <title>{`${project.title} | Celestial Web Solutions Portfolio`}</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={`${project.title}, ${project.category || 'web project'}, web development, portfolio, Celestial Web Solutions, ${project.clientCountry || 'Ghana'}`} />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={`${project.title} | Celestial Web Solutions`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
        <meta property="og:site_name" content="Celestial Web Solutions" />
        <meta property="article:published_time" content={project.completionDate !== "In Progress" ? project.completionDate : project.startDate} />
        <meta property="article:author" content="Celestial Web Solutions" />
        {project.category && <meta property="article:section" content={project.category} />}
        {project.tech && project.tech.map((tech, idx) => <meta key={idx} property="article:tag" content={tech} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={`${project.title} | Celestial Web Solutions`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={project.image} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "CreativeWork",
            "name": project.title, "description": project.description,
            "image": project.image, "url": currentUrl,
            "datePublished": project.completionDate !== "In Progress" ? project.completionDate : project.startDate,
            "creator": { "@type": "Organization", "name": "Celestial Web Solutions", "url": "https://celestialwebsolutions.net" },
            "publisher": { "@type": "Organization", "name": "Celestial Web Solutions", "logo": { "@type": "ImageObject", "url": "https://celestialwebsolutions.net/logo.png" } },
            "category": project.category || "Web Development",
            "keywords": project.tech ? project.tech.join(", ") : "",
            ...(project.client && { "client": project.client }),
            ...(project.clientCountry && { "locationCreated": project.clientCountry })
          })
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://celestialwebsolutions.net" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://celestialwebsolutions.net/portfolio" },
              { "@type": "ListItem", "position": 3, "name": project.title, "item": currentUrl }
            ]
          })
        }} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* ── Fixed Side Navigation Arrows ── */}
        {prevProject && (
          <Link href={`/portfolio/${prevProject.slug}`} className="fixed left-4 top-1/2 -translate-y-1/2 z-50 group hidden lg:flex">
            <div className="flex items-center gap-3">
              <motion.div className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center group-hover:bg-orange-500 group-hover:ring-orange-500 transition-all duration-300"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
              </motion.div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 max-w-[150px]">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Previous</p>
                <p className="text-sm text-gray-900 dark:text-white font-semibold truncate" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{prevProject.title}</p>
              </div>
            </div>
          </Link>
        )}

        {nextProject && (
          <Link href={`/portfolio/${nextProject.slug}`} className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group hidden lg:flex">
            <div className="flex items-center gap-3">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 max-w-[150px] text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Next</p>
                <p className="text-sm text-gray-900 dark:text-white font-semibold truncate" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{nextProject.title}</p>
              </div>
              <motion.div className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center group-hover:bg-orange-500 group-hover:ring-orange-500 transition-all duration-300"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </Link>
        )}

        {/* ── Hero Section ── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={project.desktopImage || project.image}
              alt={project.title}
              fill
              className="object-cover hidden md:block"
              priority
            />
            <Image
              src={project.mobileImage || project.desktopImage || project.image}
              alt={project.title}
              fill
              className="object-cover md:hidden"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/portfolio" className="text-white/80 hover:text-white mb-6 inline-flex items-center gap-2 transition font-medium group" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
              </Link>

              {project.category && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mt-4">
                  <span className="inline-block px-4 py-1.5 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-6">
                    {project.category}
                  </span>
                  {project.completionDate === "In Progress" && (
                    <span className="inline-flex items-center gap-1.5 ml-2 px-4 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
                      </svg>
                      In Progress
                    </span>
                  )}
                </motion.div>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Albert Sans, sans-serif" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.link && project.link !== "#" && (
                  <GlassButton href={project.link} variant="orange" external>
                    Visit Live Site <ExternalLink className="w-4 h-4" />
                  </GlassButton>
                )}
                <GlassButton href="/contact" variant="light">
                  Start Similar Project <ArrowRight className="w-4 h-4" />
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Project Stats Bar ── */}
        <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {project.client && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Client</p>
                    <p className="text-gray-900 dark:text-white font-semibold truncate" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.client}</p>
                  </div>
                </motion.div>
              )}
              {project.clientCountry && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Location</p>
                    <p className="text-gray-900 dark:text-white font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.clientCountry}</p>
                  </div>
                </motion.div>
              )}
              {project.duration && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Duration</p>
                    <p className="text-gray-900 dark:text-white font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.duration}</p>
                  </div>
                </motion.div>
              )}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Completed</p>
                  <p className="text-gray-900 dark:text-white font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    {project.completionDate === "In Progress" ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
                        </svg>
                        In Progress
                      </span>
                    ) : formatDate(project.completionDate || project.date)}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16">

              {/* Project Showcase Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
                <Image src={project.image} alt={project.title} width={1000} height={600} className="w-full h-auto object-cover" priority />
              </motion.div>


              {/* ✅ Device Mockup Section — Desktop + Mobile */}
              <DeviceMockup project={project} />

              {/* ── YouTube Project Walkthrough ── */}
              <ProjectVideo project={project} />

              {/* Full Page Screenshot */}
              {project.screenshot && !imageError['screenshot'] && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Full Page Preview
                  </h2>
                  <div className="relative group">
                    <motion.div className="cursor-pointer relative overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl"
                      onClick={handleImageClick} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div ref={imageContainerRef} className="relative h-[500px] overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <div ref={imageRef} className="relative w-full">
                          <img src={project.screenshot} alt={`${project.title} - Full Page Screenshot`}
                            className="w-full h-auto object-contain object-top" loading="eager"
                            onError={() => handleImageError('screenshot')} />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center pt-8 pointer-events-none">
                        <div className="text-white text-center">
                          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-3xl mb-1">↓</motion.div>
                          <p className="text-xs font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">Click to scroll</p>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isScrolling && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-4 right-4 pointer-events-none">
                            <div className="relative w-14 h-14">
                              <svg className="w-14 h-14 transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700/50" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none"
                                  strokeDasharray={`${2 * Math.PI * 24}`}
                                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                                  className="text-orange-500 transition-all duration-100" strokeLinecap="round" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-orange-500 drop-shadow-lg">{Math.round(scrollProgress)}%</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <AnimatePresence>
                      {showScrollButton && !isScrolling && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
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

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Development Process */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Development Process
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Target, title: "Planning & Research", desc: "Understanding client requirements and market analysis" },
                    { icon: Layers, title: "Design & Prototyping", desc: "Creating wireframes and visual designs" },
                    { icon: Code2, title: "Development", desc: "Building the application with modern technologies" },
                    { icon: Rocket, title: "Testing & Deployment", desc: "Quality assurance and production deployment" }
                  ].map((phase, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                        <phase.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{phase.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{phase.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">

                {/* Technology Stack */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(project.techLogos && project.techLogos.length > 0 ? project.techLogos : project.tech?.map(t => ({ name: t, logo: null }))).map((tech, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          {tech.logo && !imageError[idx] ? (
                            <Image src={tech.logo} alt={tech.name} width={24} height={24}
                              className="max-w-full max-h-full object-contain"
                              onError={() => handleImageError(idx)} />
                          ) : (
                            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                              {tech.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Project Info Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20">
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Project Info</h3>
                  <div className="space-y-4">
                    {project.client && (
                      <div>
                        <p className="text-orange-200 text-xs uppercase tracking-wide font-medium">Client</p>
                        <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.client}</p>
                      </div>
                    )}
                    {project.clientCountry && (
                      <div>
                        <p className="text-orange-200 text-xs uppercase tracking-wide font-medium">Location</p>
                        <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.clientCountry}</p>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <p className="text-orange-200 text-xs uppercase tracking-wide font-medium">Duration</p>
                        <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.duration}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-orange-200 text-xs uppercase tracking-wide font-medium">Completed</p>
                      <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                        {project.completionDate === "In Progress" ? (
                          <span className="inline-flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
                            </svg>
                            In Progress
                          </span>
                        ) : formatDate(project.completionDate || project.date)}
                      </p>
                    </div>
                  </div>
                  {project.link && project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                      style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>

                {/* Need Help Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      Need Something Similar?
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Let's discuss your project and bring your vision to life.
                  </p>
                  <GlassButton href="/contact" variant="orange" className="w-full">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </GlassButton>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Projects ── */}
        {(() => {
          const relatedProjects = projects
            .filter(p => p.slug !== project.slug)
            .sort((a, b) => {
              const aMatch = a.category?.toLowerCase() === project.category?.toLowerCase() ? 1 : 0;
              const bMatch = b.category?.toLowerCase() === project.category?.toLowerCase() ? 1 : 0;
              return bMatch - aMatch;
            })
            .slice(0, 2);
          if (relatedProjects.length === 0) return null;
          return (
            <section className="bg-gray-50 dark:bg-gray-900 py-16 lg:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Related Projects</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Explore more of our work in similar categories</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div key={relatedProject.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                      <Link href={`/portfolio/${relatedProject.slug}`} className="group block">
                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="relative h-56 overflow-hidden">
                            <Image src={relatedProject.image} alt={relatedProject.title} fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {relatedProject.category && (
                              <span className="absolute top-4 left-4 px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                {relatedProject.category}
                              </span>
                            )}
                            {relatedProject.completionDate === "In Progress" && (
                              <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
                                </svg>
                                In Progress
                              </span>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                              {relatedProject.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                              {relatedProject.description}
                            </p>
                            <div className="flex items-center text-orange-500 font-semibold text-sm">
                              View Project <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── Full Width CTA ── */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop"
              alt="Team collaboration" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-500/95" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Ready to Start Your Project?
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Let's bring your vision to life with cutting-edge technology and creative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">Start Your Project <ArrowRight className="w-4 h-4" /></GlassButton>
                <GlassButton href="/portfolio" variant="outline">View More Projects</GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Mobile Bottom Navigation ── */}
        {(prevProject || nextProject) && (
          <section className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-800">
              {prevProject ? (
                <Link href={`/portfolio/${prevProject.slug}`} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Previous</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{prevProject.title}</p>
                  </div>
                </Link>
              ) : <div className="p-4" />}
              {nextProject ? (
                <Link href={`/portfolio/${nextProject.slug}`} className="flex items-center justify-end gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-right">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{nextProject.title}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                </Link>
              ) : <div className="p-4" />}
            </div>
          </section>
        )}

        <WhatsAppButton />
      </div>
    </>
  );
}