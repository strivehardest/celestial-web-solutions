/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // Ensure consistent URLs without trailing slashes
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
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.seeklogo.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.paystack.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ntc.edu',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.wac.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.intellibright.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;