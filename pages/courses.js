import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, Star, BookOpen, Award, TrendingUp, Search, Filter } from 'lucide-react';
import { courses } from '../data/courses';

// Typing effect phrases for courses
const typingPhrases = [
  'WordPress Development',
  'Next.js Frameworks',
  'Web Design Skills',
  'Modern Web Tech',
  'Digital Mastery',
  'Full-Stack Development',
  'Excel Proficiency'
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  
  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level.toLowerCase().includes(filterLevel.toLowerCase());
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Intermediate': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Advanced': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <Head>
        <title>Online Tech Courses - Learn WordPress, Next.js & Web Design | Celestial Web Solutions</title>
        <meta name="description" content="Learn web development and design with our comprehensive online courses. Master WordPress, Next.js, and modern web design techniques." />
        <meta name="keywords" content="online courses, web development courses, WordPress course, Next.js course, web design course, Ghana" />
        <link rel="canonical" href="https://celestialwebsolutions.net/courses" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Match Site Format */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
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
            <div className="absolute inset-0 bg-gray-950 opacity-80"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                Learn. Build. Succeed.
              </h1>
              <div className="text-3xl md:text-4xl font-bold mb-8 text-orange-500 h-12"
                   style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                Master <span className="border-r-2 border-orange-500 animate-pulse">{displayText}</span>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                 style={{ fontFamily: '"Google Sans", sans-serif' }}>
                Master the skills you need to build professional websites and launch your career in tech. 
                From WordPress to modern frameworks, we've got you covered.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12"
            >
              <div className="bg-white/10 backdrop-blur-md dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>{courses.length}</h3>
                <p className="text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>Active Courses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Practical</h3>
                <p className="text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>Hands-On Learning</p>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    style={{ fontFamily: '"Google Sans", sans-serif' }}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full md:w-48 pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none cursor-pointer"
                    style={{ fontFamily: '"Google Sans", sans-serif' }}
                  >
                    <option value="all" className="bg-white dark:bg-gray-800">All Levels</option>
                    <option value="beginner" className="bg-white dark:bg-gray-800">Beginner</option>
                    <option value="intermediate" className="bg-white dark:bg-gray-800">Intermediate</option>
                    <option value="advanced" className="bg-white dark:bg-gray-800">Advanced</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400">No courses found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/courses/${course.slug}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
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
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white">
                              {course.level}
                            </span>
                          </div>
                          {course.discount > 0 && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              {course.discount}% OFF
                            </div>
                          )}
                        </div>

                        {/* Course Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2"
                              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            {course.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm"
                             style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            {course.subtitle}
                          </p>

                          {/* Instructor */}
                          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange-500">
                              <Image
                                src={course.instructor.image}
                                alt={course.instructor.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900 dark:text-white"
                                 style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                                {course.instructor.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300"
                                 style={{ fontFamily: '"Google Sans", sans-serif' }}>
                                {course.instructor.title}
                              </p>
                            </div>
                          </div>

                          {/* Course Stats */}
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{course.studentCount} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.level}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <div>
                                {course.originalPrice > course.price ? (
                                  <>
                                    <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                                      {course.currency} {course.price}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through ml-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                      {course.currency} {course.originalPrice}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                                    {course.currency} {course.price}
                                  </span>
                                )}
                              </div>
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
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
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Join hundreds of students who have transformed their careers through our courses.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 700 }}
              >
                Contact Us Today
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
