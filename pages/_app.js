// pages/_app.js
import "../styles/globals.css";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { pageTransitions } from "../utils/pageTransitions";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const transition =
    pageTransitions[router.route.replace("/", "")] || pageTransitions.home;

  // Loader state
  const [loading, setLoading] = useState(false);
  // short debounce to avoid flicker on very fast navigations
  const loadingTimerRef = useRef(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = setTimeout(() => setLoading(true), 100);
    };

    const handleRouteChangeEnd = () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  // Google Analytics page view tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!window.gtag) return;
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Layout>
        {/* Page transitions for normal page content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.route}
            initial={transition.initial}
            animate={transition.animate}
            exit={transition.exit}
            transition={transition.transition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>

        {/* Loading overlay (appears during route changes) */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="page-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
              aria-hidden={false}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col items-center gap-6"
                role="status"
                aria-label="Loading"
              >
                {/* Animated SVG + Brand Text */}
                <div className="flex items-center gap-6">
                  {/* SVG Illustration: monitor + code lines + gear */}
                  <motion.svg
                    width="120"
                    height="96"
                    viewBox="0 0 120 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="brandGrad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#f97316" />
                        <stop offset="1" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>

                    {/* Monitor */}
                    <motion.rect
                      x="6"
                      y="8"
                      width="78"
                      height="54"
                      rx="6"
                      fill="url(#brandGrad)"
                      initial={{ y: -2 }}
                      animate={{ y: [ -2, 2, -2 ] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Screen inner (dark) */}
                    <rect x="12" y="14" width="66" height="40" rx="4" fill="#fff" opacity="0.92" />
                    {/* Code lines - animated shimmer */}
                    <motion.rect
                      x="18"
                      y="20"
                      width="44"
                      height="6"
                      rx="2"
                      fill="#f3f4f6"
                      initial={{ x: -8, opacity: 0.6 }}
                      animate={{ x: [ -8, 0 ], opacity: [0.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                    <motion.rect
                      x="18"
                      y="30"
                      width="36"
                      height="6"
                      rx="2"
                      fill="#eef2ff"
                      initial={{ x: -6, opacity: 0.6 }}
                      animate={{ x: [ -6, 0 ], opacity: [0.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.15 }}
                    />
                    <motion.rect
                      x="18"
                      y="40"
                      width="28"
                      height="6"
                      rx="2"
                      fill="#fef3c7"
                      initial={{ x: -4, opacity: 0.6 }}
                      animate={{ x: [ -4, 0 ], opacity: [0.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.28 }}
                    />

                    {/* Monitor stand */}
                    <rect x="36" y="64" width="28" height="6" rx="2" fill="#111827" opacity="0.06" />
                    <rect x="34" y="70" width="32" height="6" rx="3" fill="#111827" opacity="0.04" />

                    {/* Gear (rotating) */}
                    <motion.g
                      transform="translate(102,34)"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="0" cy="0" r="0" fill="transparent" />
                      <path
                        d="M10 0 L12.5 4.8 L17.8 5.9 L14 9.5 L15 14.2 L10 12 L5 14.2 L6 9.5 L2.2 5.9 L7.5 4.8 Z"
                        transform="translate(-8,-8) scale(1.6)"
                        fill="#fff"
                        opacity="0.92"
                      />
                      <circle cx="0" cy="0" r="6" fill="url(#brandGrad)" transform="translate(-8,-8) scale(1.6)" />
                    </motion.g>
                  </motion.svg>

                  {/* Brand text with subtle bounce + orange animation */}
                  <div className="flex flex-col items-start">
                    <motion.h1
                      className="text-2xl md:text-3xl font-bold"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif", color: "rgb(234 88 12)" }}
                      animate={{ y: [0, -4, 0], opacity: [1, 0.9, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Celestial Web Solutions
                    </motion.h1>
                    <motion.span
                      className="text-sm"
                      style={{ fontFamily: "Quicksand, sans-serif", color: "rgb(134 142 150)" }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Building fast, modern websites...
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </>
  );
}
