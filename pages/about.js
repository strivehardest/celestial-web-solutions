import Head from "next/head";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Shield, Award, Users, Rocket, Heart, Code, Linkedin, Facebook, Twitter, Github } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import Link from "next/link";

/**
 * HappyClients data (place images under public/png/projects/)
 * Provide 1x, 2x variants as needed; webp optional
 */
const happyClients = [
  {
    name: "Building Planner Designs",
    src: "/png/projects/building.png",
  },
  {
    name: "Ghana Updates Online",
    src: "/png/projects/ghanaupdates1.jpg",
  },
  {
    name: "AdBay Store",
    src: "/png/projects/Adbay1.png",
  },
  {
    name: "Elolo Agbleke",
    src: "/png/projects/elolo2.jpeg",
  },
  {
    name: "Mart Ban Logistics",
    src: "/png/projects/martb.png",
  }
];

/**
 * HappyClients component (inline, reusable)
 * Props:
 *  - clients: array
 *  - speed: number (seconds per loop)
 *  - cardWidth: tailwind width class
 */
function HappyClients({ clients = [], speed = 28, cardWidth = "w-48" }) {
  const all = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          Trusted by
        </motion.h3>

        <div className="relative overflow-hidden">
          <div
            className="flex items-center"
            style={{
              animation: `marquee ${speed}s linear infinite`
            }}
          >
            {all.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className={`flex-shrink-0 mx-6 ${cardWidth} h-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700`}
              >
                <picture>
                  {client.webp && <source srcSet={client.webp} type="image/webp" />}
                  {client.srcSet ? (
                    <img
                      src={client.src}
                      srcSet={client.srcSet}
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 192px"
                      alt={client.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <img
                      src={client.src}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </picture>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Pause animation on hover (important for accessibility) */
        .relative > .flex:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

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

      {/* Hero Section - Similar to Pricing Page */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              About Us
            </h1>
            <p
              className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              At <span className="font-semibold text-white">Celestial Web Solutions</span>, we specialize in building modern, responsive, and user-friendly digital experiences that help businesses grow and thrive in the online space.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-white dark:bg-gray-900">
        {/* Founder Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Meet Our Founder
              </h2>
              <p
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                The visionary behind Celestial Web Solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              {/* Left Column - Picture */}
              <div className="relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform rotate-6"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="/founder-waliu.png" // image in public folder
                      alt="Waliu Ibrahimah Aforlabi - Founder & CEO"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback placeholder
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div 
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center text-white p-8">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Code size={64} />
                        </div>
                        <p className="text-lg font-semibold">Add founder image:</p>
                        <p className="text-sm">/public/founder-waliu.jpg</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Right Column - Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Founder & CEO
                  </div>
                  
                  <h3
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Waliu Ibrahimah Aforlabi
                  </h3>
                  
                  <p
                    className="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-6"
                    style={{ fontFamily: "Quicksand, sans-serif" }}
                  >
                    Full Stack Web Developer
                  </p>

                  <div className="space-y-4 mb-6">
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      With a passion for creating innovative digital solutions, Waliu founded Celestial Web Solutions to help businesses transform their online presence and achieve their digital goals.
                    </p>
                    
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      As a Graduate of ALX Backend Engineering, he brings expertise in both frontend and backend technologies, ensuring every project is built with precision, scalability, and user experience in mind.
                    </p>
                  </div>

                  {/* Skills/Expertise */}
                  <div className="mb-6">
                    <h4
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Node.js', 'Django', 'Tailwind CSS', 'Framer Motion','Javascript', 'CSS3', 'HTML5', 'Python', 'Bootstrap','WordPress', 'Google AdSense & Ads','UI/UX Design', 'E-Commerce'].map((skill, index) => (
                        <span
                          key={index}
                          className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-orange-700"
                          style={{ fontFamily: "Quicksand, sans-serif" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://linkedin.com/in/aforlabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-orange-600 hover:text-white hover:bg-orange-600 transition-all duration-300 shadow-md"
                    >
                      <Linkedin size={20} />
                    </motion.a>
                    <motion.a
                      href="https://twitter.com/strivehardest"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-orange-600 hover:text-white hover:bg-orange-600 transition-all duration-300 shadow-md"
                    >
                      <Twitter size={20} />
                    </motion.a>
                    <motion.a
                      href="https://facebook.com/aforlabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-orange-600 hover:text-white hover:bg-orange-600 transition-all duration-300 shadow-md"
                    > 
                      <Facebook size={20} />

                    </motion.a>
                    <motion.a
                      href="https://github.com/strivehardest"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-orange-600 hover:text-white hover:bg-orange-600 transition-all duration-300 shadow-md"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ✅ Mission & Vision with Icons */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target size={28} />
                </div>
                <h2
                  className="text-2xl font-bold text-orange-600 dark:text-orange-400"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Our Mission
                </h2>
              </div>
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
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye size={28} />
                </div>
                <h2
                  className="text-2xl font-bold text-orange-600 dark:text-orange-400"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Our Vision
                </h2>
              </div>
              <p
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                To become Ghana & Africa's most trusted digital solutions provider, enabling businesses to succeed through technology, creativity, and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ✅ Core Values with Icons */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-12"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  desc: "We embrace creativity and cutting-edge technology to deliver exceptional digital experiences that push boundaries.",
                  icon: Lightbulb,
                  gradient: "from-orange-400 to-orange-500"
                },
                {
                  title: "Integrity",
                  desc: "Honesty, transparency, and trust form the foundation of our client relationships and business practices.",
                  icon: Shield,
                  gradient: "from-orange-500 to-orange-600"
                },
                {
                  title: "Excellence",
                  desc: "We strive for perfection in every project, ensuring the highest quality standards and exceptional results.",
                  icon: Award,
                  gradient: "from-orange-600 to-red-500"
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-600"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.gradient} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300`}> 
                      <value.icon size={24} />
                    </div>
                    <h3
                      className="text-xl font-semibold text-orange-600 dark:text-orange-400"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      {value.title}
                    </h3>
                  </div>
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
        </section>

        {/* ✅ Why Choose Us Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-12"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Why Choose Us
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Team",
                  desc: "Skilled developers and designers with years of experience",
                  icon: Users,
                  color: "text-orange-500"
                },
                {
                  title: "Fast Delivery",
                  desc: "Quick turnaround times without compromising quality",
                  icon: Rocket,
                  color: "text-orange-600"
                },
                {
                  title: "24/7 Support",
                  desc: "Round-the-clock support and maintenance services",
                  icon: Heart,
                  color: "text-red-500"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 flex items-center justify-center">
                      <feature.icon size={32} className={feature.color} />
                    </div>
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-800 dark:text-white mb-2"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 text-sm"
                    style={{ fontFamily: "Quicksand, sans-serif" }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ Enhanced CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Ready to Transform Your Business?
              </h3>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Let's discuss your project and create something amazing together. Get started with a free consultation today.
              </p>
              <Link href="/contact" className="inline-flex items-center space-x-2 bg-white text-orange-600 py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                <span>Work With Us</span>
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* === HAPPY CLIENTS (inserted at the end as requested) === */}
        <HappyClients clients={happyClients} speed={28} cardWidth="w-48" />

        <WhatsAppButton />
      </div>
    </>
  );
}
