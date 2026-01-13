import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Award, CheckCircle, Video, Download, 
  TrendingUp, Calendar, User, Mail, Phone, Settings,
  LogOut, Play, Lock, Star
} from 'lucide-react';
import courses from '../data/courses';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('my-courses');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [studentProgress, setStudentProgress] = useState({});
  const [mockUser, setMockUser] = useState({
    id: 'user-' + Date.now(),
    fullName: 'Student',
    email: 'student@example.com',
    phone: '+233 XXX XXX XXXX',
    joinedDate: new Date().toISOString(),
    totalCoursesEnrolled: 0,
    completedCourses: 0,
    certificatesEarned: 0,
  });

  useEffect(() => {
    // Get enrolled course from localStorage
    if (typeof window === 'undefined') return;

    const enrollment = localStorage.getItem('pendingEnrollment');
    if (enrollment) {
      const { courseId, fullName, email, phone } = JSON.parse(enrollment);
      const course = courses.find((c) => c.id === courseId);

      setMockUser((prev) => ({
        ...prev,
        fullName: fullName || prev.fullName,
        email: email || prev.email,
        phone: phone || prev.phone,
        totalCoursesEnrolled: course ? 1 : 0,
      }));

      if (course) {
        setEnrolledCourses([{ ...course, enrollmentDate: new Date().toISOString() }]);

        const totalLessons = course.curriculum
          ? course.curriculum.reduce((sum, section) => sum + (section.lessons?.length || 0), 0)
          : 0;

        setStudentProgress({
          [courseId]: {
            completedLessons: Math.min(Math.floor(Math.random() * 10), totalLessons),
            totalLessons,
            lastAccessedDate: new Date().toISOString(),
          },
        });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Student Dashboard | Celestial Web Solutions</title>
        <meta name="description" content="Access your courses and track your learning progress" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <section className="bg-orange-500 text-white pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Welcome back, {mockUser.fullName}!
                </h1>
                <p className="text-lg opacity-90" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Continue your learning journey
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {enrolledCourses.length}
                    </div>
                    <div className="text-xs opacity-80" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      Active Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                  {/* Profile */}
                  <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {mockUser.fullName.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {mockUser.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400"
                       style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      {mockUser.email}
                    </p>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('my-courses')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'my-courses'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        My Courses
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('certificates')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'certificates'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">Certificates</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'profile'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-semibold">Profile Settings</span>
                    </button>

                    <Link href="/courses">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Exit Dashboard</span>
                      </button>
                    </Link>
                  </nav>

                  {/* Quick Links */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Quick Links</h4>
                    <div className="space-y-2 text-sm">
                      <Link href="/courses">
                        <span className="text-orange-600 hover:underline cursor-pointer">Browse Courses</span>
                      </Link>
                      <br />
                      <Link href="/contact">
                        <span className="text-orange-600 hover:underline cursor-pointer">Contact Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {activeTab === 'my-courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      My Courses
                    </h2>

                    {enrolledCourses.length === 0 ? (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          No Courses Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Start your learning journey by enrolling in a course
                        </p>
                        <Link href="/courses">
                          <button className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
                            Browse Courses
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {enrolledCourses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                {/* Course Image */}
                                <div className="md:w-64 h-40 bg-gradient-to-br from-orange-400 to-blue-500 rounded-xl flex-shrink-0 flex items-center justify-center">
                                  <Play className="w-16 h-16 text-white opacity-80" />
                                </div>

                                {/* Course Info */}
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                                        {course.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 dark:text-gray-400"
                                         style={{ fontFamily: 'Google Sans, sans-serif' }}>
                                        by {course.instructor}
                                      </p>
                                    </div>
                                    {course.certificate && (
                                      <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        Completed
                                      </div>
                                    )}
                                  </div>

                                  {/* Progress */}
                                  <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Progress: {course.progress}%
                                      </span>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.completedLessons}/{course.totalLessons} lessons
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-orange-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${course.progress}%` }}
                                      />
                                    </div>
                                  </div>

                                  {/* Next Lesson */}
                                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                      <span className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Next:</span> {course.nextLesson}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-wrap gap-3">
                                    <Link href={`/courses/${course.slug}`}>
                                      <button className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                                        <Play className="w-4 h-4" />
                                        Continue Learning
                                      </button>
                                    </Link>
                                    <button className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                      <Download className="w-4 h-4" />
                                      Resources
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Last Accessed */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Last accessed: {course.lastAccessed}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'certificates' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Certificates</h2>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
                      <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No Certificates Yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Complete your courses to earn certificates
                      </p>
                      <Link href="/courses">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          Continue Learning
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                      <form className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              value={mockUser.fullName}
                              readOnly
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="email"
                              value={mockUser.email}
                              readOnly
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="tel"
                              value={mockUser.phone}
                              readOnly
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Note:</strong> To update your profile information, please{' '}
                            <Link href="/contact">
                              <span className="text-orange-600 hover:underline cursor-pointer">contact support</span>
                            </Link>
                            .
                          </p>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
