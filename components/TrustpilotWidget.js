import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TrustpilotWidget() {
  const trustpilotUrl = "https://www.trustpilot.com/review/celestialwebsolutions.net";
  
  const stats = {
    rating: 4.8,
    totalReviews: 50,
    percentage: 98
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-block w-full md:w-auto"
    >
      <div className="bg-gradient-to-br from-[#003B82] to-[#00509F] rounded-2xl p-6 md:p-8 shadow-xl border border-blue-400/20 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">{stats.rating}</span>
              <span className="text-blue-200">/5</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-green-400 text-green-400" 
                />
              ))}
            </div>
            <p className="text-sm text-blue-100" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              {stats.percentage}% Recommended
            </p>
          </div>

          {/* Trustpilot Logo */}
          <div className="text-right">
            <svg className="w-20 h-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="35" fontSize="24" fontWeight="bold" fill="white" fontFamily="Arial">
                Trustpilot
              </text>
            </svg>
          </div>
        </div>

        <p className="text-sm text-blue-100 mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
          Based on <span className="font-semibold">{stats.totalReviews}+ reviews</span> from real customers
        </p>

        <Link href={trustpilotUrl} target="_blank" rel="noopener noreferrer">
          <motion.a
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-full font-semibold transition-colors text-sm"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read Our Reviews
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </Link>

        <p className="text-xs text-blue-200 mt-4">
          ✓ Verified Reviews • ✓ Transparent Rating • ✓ Community Driven
        </p>
      </div>
    </motion.div>
  );
}
