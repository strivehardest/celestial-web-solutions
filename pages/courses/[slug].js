import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, Star, BookOpen, Award, CheckCircle, Play, 
  ChevronDown, ChevronUp, Calendar, Globe, TrendingUp, 
  Video, Download, MessageCircle, Share2, ArrowRight, Copy, Check 
} from 'lucide-react';
import { courses, getCourseBySlug, getAllCourseSlugs } from '../../data/courses';

export default function CourseDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const course = getCourseBySlug(slug);

  const [expandedSections, setExpandedSections] = useState([0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg">
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (index) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const totalLessons = course.curriculum.reduce((sum, section) => sum + section.lessons.length, 0);
  const totalDuration = course.duration;

  return (
    <>
      <Head>
        <title>{course.title} | Celestial Web Solutions</title>
        <meta name="description" content={course.subtitle} />
        <meta name="keywords" content={`${course.title}, online course, web development, Ghana`} />
        <link rel="canonical" href={`https://celestialwebsolutions.net/courses/${course.slug}`} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Match Site Format */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
          {/* Hero Video */}
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/hero3.mp4"
              className="w-full h-full object-cover object-center"
              style={{ minHeight: '90vh' }}
              autoPlay
              muted
              loop
              playsInline
              poster="/team.png"
            />
            <div className="absolute inset-0 bg-gray-950 opacity-85"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      {course.level}
                    </span>
                    <span className="text-gray-300 text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      Updated {course.lastUpdated}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {course.title}
                  </h1>

                  <p className="text-xl text-gray-300 mb-6" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {course.subtitle}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span className="text-white">{course.studentCount} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-500" />
                      <span className="text-white">{course.language}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>Created by</p>
                      <p className="text-lg font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {course.instructor.name}
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Card - Course Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden sticky top-24"
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-400 to-blue-500">
                    {course.thumbnail && (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="p-6">
                    <div className="mb-6">
                      {course.originalPrice > course.price ? (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                              {course.currency} {course.price}
                            </span>
                            <span className="text-xl text-gray-500 line-through" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                              {course.currency} {course.originalPrice}
                            </span>
                          </div>
                          <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                            {course.discount}% OFF - Limited Time!
                          </div>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                          {course.currency} {course.price}
                        </span>
                      )}
                    </div>

                    <Link href={`/courses/enroll/${course.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Enroll Now
                      </motion.button>
                    </Link>

                    <Link href="/contact">
                      <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        Contact Us
                      </button>
                    </Link>

                    {/* Course Includes */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>This course includes:</h4>
                      <ul className="space-y-3">
                        {course.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Share */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        <Share2 className="w-4 h-4 text-orange-600" />
                        Share this course
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          title="Share on Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white transition-colors"
                          title="Share on Twitter/X"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors"
                          title="Share on LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(course.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                          title="Share on WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                          title="Share on Telegram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </a>
                        <a
                          href={`https://www.instagram.com/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white transition-colors"
                          title="Share on Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                        </a>
                        <button
                          onClick={handleCopyLink}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                          title="Copy Link"
                        >
                          {copied ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8 overflow-x-auto">
              {['overview', 'curriculum', 'mode of studies', 'instructor', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-semibold capitalize whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* What You'll Learn */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>What you'll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.whatYouLearn.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Course Description */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Course Description</h2>
                        <div className="prose dark:prose-invert max-w-none">
                          {course.description.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-700 dark:text-gray-300 mb-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Requirements</h2>
                        <ul className="space-y-3">
                          {course.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                              <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources */}
                      {course.resources && course.resources.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Resources</h2>
                          <div className="space-y-3">
                            {course.resources.map((resource, index) => (
                              <a 
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors group"
                              >
                                <div className="flex-1">
                                  <p className="text-gray-900 dark:text-white font-semibold group-hover:text-orange-600 transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                    {resource.title}
                                  </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'curriculum' && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                    >
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Course Curriculum</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {course.curriculum.length} sections • {totalLessons} lectures • {totalDuration} total length
                        </p>
                      </div>

                      <div className="space-y-4">
                        {course.curriculum.map((section, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleSection(index)}
                              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900 dark:text-white" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>{section.section}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {section.lessons.length} lectures
                                </span>
                              </div>
                              {expandedSections.includes(index) ? (
                                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              )}
                            </button>

                            <AnimatePresence>
                              {expandedSections.includes(index) && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 space-y-2">
                                    {section.lessons.map((lesson, lessonIndex) => (
                                      <div
                                        key={lessonIndex}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          <Play className="w-4 h-4 text-gray-400" />
                                          <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>{lesson.title}</span>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Google Sans", sans-serif' }}>{lesson.duration}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'mode of studies' && (
                    <motion.div
                      key="mode-of-studies"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Mode of Studies</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.modeOfStudies && course.modeOfStudies.map((mode, index) => (
                          <div key={index} className="flex items-center gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all">
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 shadow-md">
                              {mode === 'Online Videos' && (
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                                  <path d="M8 5v14l11-7z" fill="#FF0000"/>
                                </svg>
                              )}
                              {mode === 'Face to Face' && (
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                                  <circle cx="9" cy="7" r="4" fill="#FF6B35"/>
                                  <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#FF6B35" strokeWidth="2"/>
                                  <circle cx="17" cy="7" r="3" fill="#FF9966"/>
                                  <path d="M20 20c0-2.21-1.79-4-4-4" stroke="#FF9966" strokeWidth="2"/>
                                </svg>
                              )}
                              {mode === 'Google Meet' && (
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                                  <path d="M15 12.5V8c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-4.5l4 4v-9l-4 4z" fill="#00AC47"/>
                                  <path d="M19 15.5l-4-4v8l4-4z" fill="#0066DA"/>
                                </svg>
                              )}
                              {mode === 'Zoom' && (
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                                  <rect x="2" y="5" width="14" height="14" rx="2" fill="#2D8CFF"/>
                                  <path d="M17 8l4-2v12l-4-2V8z" fill="#2D8CFF"/>
                                </svg>
                              )}
                              {mode === 'Teams' && (
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                                  <rect x="3" y="3" width="9" height="9" rx="1" fill="#5059C9"/>
                                  <rect x="13" y="3" width="8" height="9" rx="1" fill="#7B83EB"/>
                                  <rect x="3" y="13" width="9" height="8" rx="1" fill="#7B83EB"/>
                                  <circle cx="17" cy="17" r="4" fill="#5059C9"/>
                                  <text x="17" y="19" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">T</text>
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                                {mode}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                                {mode === 'Online Videos' && 'Self-paced video content'}
                                {mode === 'Face to Face' && 'In-person classes'}
                                {mode === 'Google Meet' && 'Live sessions & support'}
                                {mode === 'Zoom' && 'Interactive classes'}
                                {mode === 'Teams' && 'Collaborative learning'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 space-y-4">
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>How It Works</h3>
                          <p className="text-blue-800 dark:text-blue-200" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            This course combines multiple learning methods to provide flexibility and engagement. You can learn at your own pace with video content, join live sessions for real-time interaction, or attend in-person classes. Choose the format that works best for your schedule!
                          </p>
                        </div>

                        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Course Materials</h3>
                          <p className="text-green-800 dark:text-green-200" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            All course materials, resources, and content will be available to you immediately after successful enrollment. Download and access them anytime during your course journey!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'instructor' && (
                    <motion.div
                      key="instructor"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Instructor</h2>
                      
                      <div className="flex items-start gap-6 mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={course.instructor.image}
                            alt={course.instructor.name}
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            {course.instructor.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>{course.instructor.title}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>{course.instructor.rating} Instructor Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{course.instructor.students} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.instructor.courses} Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        {course.instructor.bio}
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Student Reviews</h2>
                      
                      {/* Write a Review Section */}
                      <div className="bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8 text-center">
                        <MessageCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                          Share Your Experience
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                          Help other students by sharing your thoughts about this course. Your feedback helps us improve and guides others in their learning journey.
                        </p>
                        <a 
                          href="https://forms.gle/YYESC6fRJHDqtpDK7" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                            style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 700 }}
                          >
                            <MessageCircle className="w-5 h-5" />
                            Write a Review
                          </motion.button>
                        </a>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                          Takes less than 2 minutes
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar - Empty on mobile, sticky card on desktop is already in hero */}
              <div className="hidden lg:block lg:col-span-1">
                {/* The course card is sticky in the hero section */}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/team.png"
              alt="Contact Us"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-orange-500 opacity-90"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Join hundreds of students who have transformed their careers through our courses.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Contact Us Today
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Related Courses */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>More Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.filter(c => c.id !== course.id).slice(0, 3).map((relatedCourse) => (
                <Link key={relatedCourse.id} href={`/courses/${relatedCourse.slug}`}>
                  <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="relative h-48 bg-gradient-to-br from-orange-400 to-blue-500">
                      {relatedCourse.thumbnail && (
                        <Image
                          src={relatedCourse.thumbnail}
                          alt={relatedCourse.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                        {relatedCourse.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                          {relatedCourse.currency} {relatedCourse.price}
                        </span>
                        <ArrowRight className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllCourseSlugs();
  const paths = slugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  };
}
