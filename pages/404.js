// pages/404.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

// Client-only components (prevent SSR crashes)
const ClientAnimatedHero = dynamic(() => import("../components/ClientAnimatedHero"), { ssr: false });
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false });

export default function Custom404() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) return;
    const site = "site:celestialwebsolutions.net";
    const url = `https://www.google.com/search?q=${encodeURIComponent(`${site} ${q}`)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Page not found â€” Celestial Web Solutions. Return home or contact us for help."
        />
        <link rel="canonical" href="https://celestialwebsolutions.net/404" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=Google Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        {/* Hero Section (client-only; uses framer-motion inside) */}
        <ClientAnimatedHero>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            404
          </h1>
          <h2
            className="text-2xl md:text-3xl font-semibold text-orange-100 mb-6"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Oops â€” Page not found
          </h2>
          <p
            className="text-lg text-orange-100 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Google Sans, sans-serif" }}
          >
            The page you're looking for might have been moved, does not exists or no longer exists. Try searching
            our site, return home, or contact us and we'll help you find what you need.
          </p>
        </ClientAnimatedHero>

        {/* Main 404 Content */}
        <main className="flex-1 bg-white dark:bg-gray-900 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-12 border border-orange-100 dark:border-gray-700">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Left content */}
                <div className="md:col-span-2">
                  <h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    We couldn't find that page
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 mb-6"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    It might be a broken link, a mistyped URL, or the content has moved. Try one of
                    the quick actions below â€” or use the search to look for keywords (page title,
                    service name, or topic).
                  </p>

                  {/* Search box */}
                  <form onSubmit={handleSearch} className="flex gap-3 items-center mb-6">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search the site (e.g. 'pricing', 'portfolio')"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                      aria-label="Search the site"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition-all duration-200"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      <span>Search</span>
                    </button>
                  </form>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold shadow hover:shadow-xl transition-all duration-300"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      <span>Back to Home</span>
                      <ArrowRight className="ml-3" size={16} />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-2xl font-semibold hover:bg-orange-50 transition-all duration-300"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      <span>Contact Support</span>
                    </Link>

                    <a
                      href="tel:+233245671832"
                      className="inline-flex items-center justify-center text-white bg-green-600 px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      <span>Call Us</span>
                    </a>
                  </div>
                </div>

                {/* Right illustration / suggestions */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                  {/* Orange-branded SVG illustration */}
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      width="160"
                      height="120"
                      viewBox="0 0 160 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0" stopColor="#f97316" />
                          <stop offset="1" stopColor="#ea580c" />
                        </linearGradient>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.12" />
                        </filter>
                      </defs>

                      <rect x="8" y="20" width="144" height="72" rx="12" fill="url(#g1)" filter="url(#shadow)" />
                      <circle cx="40" cy="54" r="8" fill="white" />
                      <rect x="60" y="44" width="72" height="6" rx="3" fill="white" opacity="0.95" />
                      <rect x="60" y="58" width="48" height="6" rx="3" fill="white" opacity="0.9" />
                      <rect x="60" y="72" width="32" height="6" rx="3" fill="white" opacity="0.85" />
                      <path d="M26 36c3 0 8-2 12-2s9 2 12 2" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                    </svg>
                  </div>

                  <h4
                    className="text-lg font-semibold text-gray-800 dark:text-white mb-3"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Quick links
                  </h4>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300" style={{ fontFamily: "Google Sans, sans-serif" }}>
                    <li>
                      <Link href="/services" className="hover:underline">
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" className="hover:underline">
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:underline">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:underline">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="/faqs" className="hover:underline">
                        FAQs
                      </Link>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>
                      Prefer direct help?
                    </p>
                    <div className="mt-3">
                      <a
                        href="https://wa.me/233530505031"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-200"
                        style={{ fontFamily: "Google Sans, sans-serif" }}
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small helper note */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>
              If you think this is a mistake, please <Link href="/contact" className="underline">contact us</Link> and mention the broken link.
            </div>
          </div>
        </main>

        {/* Bottom spacing */}
        <div className="pb-12" />
      </div>

      {/* Client-only WhatsApp button */}
      <WhatsAppButton />
    </>
  );
}
