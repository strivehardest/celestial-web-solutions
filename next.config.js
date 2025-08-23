// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization for WordPress images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.celestialwebsolutions.net',
      },
      {
        protocol: 'https',
        hostname: 'www.celestialwebsolutions.net',
      },
    ],
    // Fallback for other image sources
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Redirects (if you want to redirect old WordPress URLs)
  async redirects() {
    return [
      // Example: Redirect old WordPress blog URLs to new structure
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },

  // Headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig