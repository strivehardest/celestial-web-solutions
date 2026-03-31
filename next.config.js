const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/web-design-company-in-ghana/web-development',
        destination: '/web-design-company-in-ghana/web-development-company-in-ghana',
        permanent: true,
      },
      {
        source: '/web-design-company-in-ghana/web-development-in-ghana',
        destination: '/web-design-company-in-ghana/web-development-company-in-ghana',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-src 'self' https://www.youtube.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://calendly.com https://challenges.cloudflare.com;",
          },
        ],
      },
      {
        source: '/(images|fonts|portfolio|png)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/tech/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.seeklogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'seeklogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'assets.paystack.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.ntc.edu', pathname: '/**' },
      { protocol: 'https', hostname: 'admin.wac.co', pathname: '/**' },
      { protocol: 'https', hostname: 'www.intellibright.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withPWA(nextConfig);
