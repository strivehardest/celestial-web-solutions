import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';

export default function PaymentSuccess() {
  const [verifying, setVerifying] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get enrollment data from localStorage
    const storedData = localStorage.getItem('pendingEnrollment');
    if (storedData) {
      setEnrollmentData(JSON.parse(storedData));
    }

    // Get reference from URL params
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const reference = params.get('reference');

    // Verify payment with backend
    if (reference) {
      verifyPayment(reference);
    } else {
      setVerifying(false);
      setError('No payment reference found');
    }
  }, []);

  const verifyPayment = async (ref) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: ref })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        
        // Clear localStorage after successful payment
        localStorage.removeItem('pendingEnrollment');

        // Open Google Form for profile completion after payment
        setTimeout(() => {
          window.open('https://forms.gle/YYESC6fRJHDqtpDK7', '_blank');
        }, 2000);
      } else {
        setError(data.message || 'Payment verification failed');
      }
    } catch (err) {
      setError('Failed to verify payment. Please contact support.');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            Verifying Payment...
          </h2>
          <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            {error}
          </p>
          <Link href="/courses">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            Payment Verified!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            Opening enrollment form. Please complete your profile.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Payment Confirmed | Celestial Web Solutions</title>
        <meta name="description" content="Payment confirmed. Access your course now." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            We're redirecting you to complete your enrollment.
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
