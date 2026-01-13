import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  CheckCircle, CreditCard, User, Mail, Phone, MapPin, 
  Calendar, Clock, Shield, Award, ArrowLeft, Smartphone, Copy, ExternalLink 
} from 'lucide-react';
import { getCourseBySlug, getAllCourseSlugs } from '../../../data/courses';

export default function EnrollCourse() {
  const router = useRouter();
  const { slug } = router.query;
  const course = getCourseBySlug(slug);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Ghana',
    city: '',
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Course Not Found</h1>
          <Link href="/courses">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600 }}>
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Store enrollment data in localStorage
    const enrollmentData = {
      courseId: course.slug,
      courseTitle: course.title,
      coursePrice: course.price,
      courseCurrency: course.currency,
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingEnrollment', JSON.stringify(enrollmentData));

    // Simulate API call to save user data
    setTimeout(() => {
      setLoading(false);
      
      // Course-specific Paystack links
      let paystackUrl;
      if (course.slug === 'web-design-fundamentals') {
        paystackUrl = 'https://paystack.shop/pay/web-design-fundamentals';
      } else if (course.slug === 'microsoft-excel-mastery') {
        paystackUrl = 'https://paystack.shop/pay/excel-mastery-course';
      } else if (course.slug === 'learn-nextjs-course') {
        paystackUrl = 'https://paystack.shop/pay/nextjs-course';
      } else if (course.slug === 'learn-wordpress-course') {
        paystackUrl = 'https://paystack.shop/pay/wordpress-course';
      }

      // Redirect to Paystack checkout
      window.location.href = paystackUrl;
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-orange-500 dark:text-orange-400" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
            Enrollment Request Received!
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            Thank you for enrolling in <span className="font-bold text-orange-600">{course.title}</span>
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>What happens next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  Our team will contact you via WhatsApp within 24 hours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  You'll receive payment instructions for your selected method
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  After payment confirmation, you'll get instant access to the course
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  Check your email for login credentials and course details
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <button className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600 }}>
                Browse More Courses
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600 }}>
                Back to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Enroll in {course.title} | Celestial Web Solutions</title>
        <meta name="description" content={`Enroll in ${course.title} and start learning today`} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          {/* Hero Video */}
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/hero1.mp4"
              className="w-full h-full object-cover object-center"
              style={{ minHeight: '60vh' }}
              autoPlay
              muted
              loop
              playsInline
              poster="/team.png"
            />
            <div className="absolute inset-0 bg-gray-950 opacity-85"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  {course.level}
                </span>
                <span className="text-gray-300 text-sm" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  {course.duration} • {course.language}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                Enroll in {course.title}
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                {course.subtitle}
              </p>

              <div className="flex items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span style={{ fontFamily: '"Google Sans", sans-serif' }}>1 Year Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span style={{ fontFamily: '"Google Sans", sans-serif' }}>Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span style={{ fontFamily: '"Google Sans", sans-serif' }}>Secure Payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Link href={`/courses/${course.slug}`}>
            <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 mb-8 transition-colors"
                    style={{ fontFamily: '"Google Sans", sans-serif' }}>
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Course</span>
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
              >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                Complete Your Enrollment
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  Fill in your details to enroll in this course
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                      <User className="w-5 h-5 text-orange-600" />
                      Personal Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:font-bricolage"
                          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                          placeholder="Kofi Mensah"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:font-bricolage"
                              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                              placeholder="kofi@mensah.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:font-bricolage"
                              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                              placeholder="+233 24 123 4567"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            Country *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                            >
                              <option value="Ghana">Ghana</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Kenya">Kenya</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:font-bricolage"
                            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                            placeholder="Accra"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Notice */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-orange-500 border border-orange-600 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Shield className="w-8 h-8 text-white flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                            Secure Payment with Paystack
                          </h3>
                          <p className="text-sm text-white/90 mb-3" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                            After submitting this form, you'll be redirected to our secure Paystack checkout page to complete your payment for <strong>{course.title}</strong>.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                              <CheckCircle className="w-3 h-3 text-white" />
                              SSL Encrypted
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                              <CheckCircle className="w-3 h-3 text-white" />
                              Card & Bank Transfer
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                              <CheckCircle className="w-3 h-3 text-white" />
                              Instant Access
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 mt-1 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        I agree to the{' '}
                        <Link href="/terms" className="text-orange-600 hover:underline">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-orange-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || !formData.agreeTerms}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 700 }}
                  >
                    {loading ? 'Processing...' : 'Complete Enrollment'}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sticky top-24"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>Order Summary</h3>

                {/* Course Info */}
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative h-32 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-orange-400 to-blue-500">
                    {course.thumbnail && (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                    <span>Original Price</span>
                    <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600 }}>{course.currency} {course.originalPrice}</span>
                  </div>
                  {course.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      <span>Discount ({course.discount}%)</span>
                      <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600 }}>-{course.currency} {course.originalPrice - course.price}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                  <span>Total</span>
                  <span className="text-orange-600" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>{course.currency} {course.price}</span>
                </div>

                {/* Benefits */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}>
                    <Shield className="w-5 h-5 text-blue-600" />
                    Course Benefits
                  </h4>
                  <ul className="space-y-2">
                    {course.includes.slice(0, 4).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                  <Award className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                    Secure enrollment powered by Celestial Web Solutions
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
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
