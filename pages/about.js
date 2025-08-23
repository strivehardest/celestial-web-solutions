import Head from "next/head";
import { motion } from "framer-motion";


export default function AboutUs() {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>About Us | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Learn more about Celestial Web Solutions - Our mission, vision, and core values. We deliver innovative, secure, and scalable digital solutions to empower businesses."
        />
        <meta
          name="keywords"
          content="About Celestial Web Solutions, Web Development, Digital Solutions, Best Web Designer in Ghana, Web Designer in Ghana, Best Web Designer in Accra, Ghana Web Agency, Mission, Vision, Core Values"
        />
        <meta name="author" content="Celestial Web Solutions" />

        {/* ✅ Open Graph for Social Sharing */}
        <meta property="og:title" content="About Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Discover our mission and vision to empower businesses with cutting-edge web solutions."
        />
        <meta
          property="og:image"
          content="https://celestialwebsolutions.net/images/about-us-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/about" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Celestial Web Solutions" />
        <meta
          name="twitter:description"
          content="Learn more about our mission, vision, and values."
        />
        <meta
          name="twitter:image"
          content="https://celestialwebsolutions.net/images/about-us-banner.jpg"
        />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://celestialwebsolutions.net/about" />
      </Head>

      {/* ✅ About Us Section */}
      <section className="bg-white dark:bg-gray-900 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            About Us
          </h1>
          <p
            className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          >
            At <span className="font-semibold text-orange-600">Celestial Web Solutions</span>, we specialize in building modern, responsive, and user-friendly digital experiences that help businesses grow and thrive in the online space.
          </p>
        </div>

        {/* ✅ Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            <h2
              className="text-2xl font-bold text-orange-600 mb-4"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Mission
            </h2>
            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              To deliver innovative, secure, and scalable digital solutions that empower businesses to achieve their full potential in the digital era.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            <h2
              className="text-2xl font-bold text-orange-600 mb-4"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Vision
            </h2>
            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              To become Ghana & Africa’s most trusted digital solutions provider, enabling businesses to succeed through technology, creativity, and innovation.
            </p>
          </motion.div>
        </div>

        {/* ✅ Core Values */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2
            className="text-3xl font-bold text-center text-orange-600 mb-8"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                desc: "We embrace creativity and cutting-edge technology to deliver exceptional digital experiences.",
              },
              {
                title: "Integrity",
                desc: "Honesty, transparency, and trust form the foundation of our client relationships.",
              },
              {
                title: "Excellence",
                desc: "We strive for perfection in every project, ensuring the highest quality standards.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3
                  className="text-xl font-semibold text-orange-500 mb-2"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                  style={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ✅ CTA Section */}
        <div className="text-center mt-16">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-orange-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Work With Us →
          </motion.a>
        </div>
      </section>
    </>
  );
}
