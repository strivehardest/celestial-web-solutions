import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function GoogleReviewsHero() {
  const googleReviewUrl = "https://www.google.com/maps/place/Celestial+Web+Solutions/@5.883579,0.9829622,17z/data=!4m6!3m5!1s0x1021710073fe6fff:0x96453357ca880329!8m2!3d5.8836217!4d0.9828871!16s%2Fg%2F11lf36fzj1";
  
  const reviews = [
    {
      author: "Joseph K.",
      rating: 5,
      text: "Excellent web design service! Professional and timely delivery.",
      initials: "JK"
    },
    {
      author: "Ama S.",
      rating: 5,
      text: "Best web design company in Ghana. Highly recommended!",
      initials: "AS"
    },
    {
      author: "Kwame O.",
      rating: 5,
      text: "Outstanding work. My website looks amazing and converts well.",
      initials: "KO"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left side: Rating and CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-orange-600">4.9</span>
                <span className="text-gray-600 dark:text-gray-400 text-lg">/ 5.0</span>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                Based on 30+ verified reviews
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Real feedback from our satisfied clients on Google
              </p>

              <Link href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                <motion.a
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors w-full justify-center"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  View Reviews
                </motion.a>
              </Link>
            </div>
          </motion.div>

          {/* Right side: Review cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:w-2/3 space-y-4"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{review.initials}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {review.author}
                      </h4>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      {review.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>⭐ {reviews.length} recent verified Google reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
