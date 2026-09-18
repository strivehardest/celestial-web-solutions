const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  publicExcludes: [
    '!png/**/*',
    '!portfolio/**/*',
    '!images/**/*',
    '!fonts/**/*',
    '!videos/**/*',
  ],
  buildExcludes: [
    /png\/.*/,
    /portfolio\/.*/,
    /images\/.*/,
    /fonts\/.*/,
    /videos\/.*/,
  ],
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
              "frame-src 'self' https://www.youtube.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://translate.google.com https://translate.googleapis.com https://www.gstatic.com https://calendly.com https://challenges.cloudflare.com;",
          },
        ],
      },
      {
        // Static screenshot assets only — do not match /portfolio or /portfolio/[slug] pages
        source: '/portfolio/(desktop|mobile)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(images|fonts|png)/(.*)',
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

  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
    outputFileTracingIncludes: {
      '/blog/[slug]': [
        './node_modules/@sanity/client/**/*',
        './node_modules/@sanity/image-url/**/*',
        './node_modules/@portabletext/react/**/*',
        './node_modules/get-it/**/*',
      ],
      '/blog': [
        './node_modules/@sanity/client/**/*',
        './node_modules/@sanity/image-url/**/*',
        './node_modules/get-it/**/*',
      ],
      '/api/client-agreement-pdf': [
        './lib/pdf-assets/**/*',
        './public/fonts/**/*',
        './public/logo-pdf.png',
        './node_modules/pdfkit/**/*',
      ],
      '/api/terms-pdf': [
        './lib/pdf-assets/**/*',
        './public/fonts/**/*',
        './public/logo-pdf.png',
        './node_modules/pdfkit/**/*',
      ],
      'pages/api/client-agreement-pdf.js': [
        './lib/pdf-assets/**/*',
        './public/fonts/**/*',
        './public/logo-pdf.png',
        './node_modules/pdfkit/**/*',
      ],
      'pages/api/terms-pdf.js': [
        './lib/pdf-assets/**/*',
        './public/fonts/**/*',
        './public/logo-pdf.png',
        './node_modules/pdfkit/**/*',
      ],
    },
  },

  webpack: (config, { isServer }) => {
    // Keep pdfkit bundled with the serverless function so its assets resolve.
    // Do NOT mark it as an external — that commonly breaks font loading on Vercel.
    return config;
  },

  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'images.seeklogo.com',     pathname: '/**' },
      { protocol: 'https', hostname: 'seeklogo.com',            pathname: '/**' },
      { protocol: 'https', hostname: 'assets.paystack.com',     pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com',     pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com',       pathname: '/**' },
      { protocol: 'https', hostname: 'www.ntc.edu',             pathname: '/**' },
      { protocol: 'https', hostname: 'admin.wac.co',            pathname: '/**' },
      { protocol: 'https', hostname: 'www.intellibright.com',   pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net',        pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com',         pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org',    pathname: '/**' },
      { protocol: 'https', hostname: 'flagcdn.com',             pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io',           pathname: '/**' },
      { protocol: 'https', hostname: 'admin.fruxinfo.com',      pathname: '/**' },
      { protocol: 'https', hostname: 'www.actcampuscare.com',   pathname: '/**' },
      { protocol: 'https', hostname: 'www.ghanasevent.com',     pathname: '/**' },
      { protocol: 'https', hostname: 'blog.ghanasevent.com',    pathname: '/**' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withPWA(nextConfig);