/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // ✅ Use static export
  trailingSlash: true,     // ✅ Ensures clean URLs with / (good for static hosting)
  images: {
    unoptimized: true,     // ✅ Disable Next image optimizer (not needed for static hosting)
  },
}

module.exports = nextConfig
