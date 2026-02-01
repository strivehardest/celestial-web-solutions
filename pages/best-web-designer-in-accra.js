import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle, Award, Users, Code, TrendingUp } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import Image from 'next/image';

const highlights = [
  'Pixel-perfect, responsive layouts for every device',
  'SEO-first builds that rank locally in Accra and beyond',
  'Fast delivery with clear, friendly communication'
];

const heroVideo = '/videos/hero1.mp4';

const stats = [
  { label: 'Projects delivered', value: '20+' },
  { label: 'Average launch time', value: '2-4 weeks' },
  { label: 'Average client rating', value: '4.9 / 5' },
];

const serviceFocus = [
  'Business websites with clear messaging',
  'Conversion-ready e-commerce experiences',
  'SEO and Core Web Vitals performance',
];

const portfolioHighlights = [
  {
    title: 'My Space Furniture',
    category: 'Furniture & E-Commerce',
    description: 'Modern furniture platform with interactive categories and seamless shopping experience.',
    image: '/png/projects/myspace-furniture.png',
    slug: 'myspace-furniture'
  },
  {
    title: 'Ghana Updates Online',
    category: 'News & Media',
    description: 'High-performance news platform delivering timely updates to thousands of readers.',
    image: '/png/projects/ghanaupdates.png',
    slug: 'ghana-updates-online'
  },
  {
    title: 'Building Planner Designs',
    category: 'Architecture & Design',
    description: 'Professional services website showcasing architectural and design expertise.',
    image: '/png/projects/buildingplanner.png',
    slug: 'best-web-designer-in-accra'
  }
];

const testimonials = [
  {
    name: 'Rev. Frank Ntow Gyan',
    company: 'Building Planner Designs Limited',
    role: 'CEO',
    text: 'Working with Celestial Web Solutions was incredible! They transformed our outdated website into a modern, user-friendly platform. Our online sales have increased by 200% since the launch.',
    rating: 5,
    image: '/testimonials/frank.jpg'
  },
  {
    name: 'Righteous Semahar',
    company: 'RAK Foundation',
    text: 'Expertise in Web Development, their services are excellent.',
      role: 'CEO',
      text: 'Expertise in Web Development, their services are excellent.',
    rating: 5,
    image: '/testimonials/righteous.jpg'
  },
  {
    name: 'Elolo Agbleke',
    company: 'Keta Institute of Technology',
    role: 'Program Manager, COO',
      text: 'Great design concepts, always available for quick design changes, open to collaboration and customer-focused. Vast experience easily shows in their output. Good prices as well',
    rating: 5,
    image: '/testimonials/elolo.jpg'
  }
];

export default function BestWebDesignerInAccraPage() {
  return (
    <>
      <Head>
        <title>Best Web Designer in Accra | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Looking for the best web designer in Accra? Celestial Web Solutions builds fast, SEO-optimized websites that grow businesses in Ghana. Get started today."
        />
        <link
          rel="canonical"
          href="https://celestialwebsolutions.net/best-web-designer-in-accra"
        />
        <meta name="keywords" content="best web designer in Accra, web design companies in accra, web design company in Ghana, SEO services in Ghana, e-commerce website Ghana, business website design Ghana, affordable web design Ghana" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
        {/* Dark navbar background strip for text visibility */}
        <div className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-black/30 backdrop-blur-sm z-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 space-y-14">
          <section className="relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-white/10 bg-gray-50/80 dark:bg-black/40 backdrop-blur-lg shadow-2xl">
            <div className="absolute inset-0">
              <video
                key={heroVideo}
                src={heroVideo}
                className="h-full w-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/70 dark:from-black/80 dark:via-black/78 dark:to-black/85" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-wide" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      BEST WEB DESIGN IN ACCRA
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-display text-gray-900 dark:text-white">
                    Best Web Designer in Accra
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed">
                    As a professional web designer in Accra, we craft conversion-focused websites that help Ghanaian brands launch fast and stand out online.
                  </p>

                  <div className="space-y-3">
                    {serviceFocus.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-base text-gray-800 dark:text-gray-100">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                    >
                      Book a project call
                    </Link>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center justify-center rounded-full border border-gray-900/15 dark:border-white/25 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white transition hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-300 bg-white/70 dark:bg-white/5 backdrop-blur"
                    >
                      View recent work
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Fast response
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Accra-based
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      MoMo & Paystack
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200/50 dark:border-white/10">
                    <p className="text-base text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      We're a trusted web design company in Accra specializing in business websites, e-commerce platforms, and SEO-optimized solutions for website design in Ghana.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-6 shadow-xl shadow-orange-500/10">
                    <p className="text-sm uppercase tracking-[0.18em] text-orange-500 font-semibold mb-4">Project outcomes</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {stats.map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 text-center">
                          <div className="text-2xl font-display text-gray-900 dark:text-white">{stat.value}</div>
                          <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
                    <h3 className="text-lg font-semibold font-display text-gray-900 dark:text-white mb-3">What you get</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>• Strategy, copy, and design aligned to your goals</li>
                      <li>• Speed, SEO, and analytics baked in from day one</li>
                      <li>• Ongoing support and growth-focused iterations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-5 shadow-lg shadow-orange-500/10"
                >
                  <p className="text-base text-gray-800 dark:text-gray-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold">Why choose us (proof)</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Why you can trust Celestial Web Solutions</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl">Evidence that we deliver: seasoned experience, diverse clients, modern stacks, and measurable business outcomes.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Years of experience</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">3+ years shipping web experiences</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Product, marketing, and transactional sites delivered for Ghanaian brands.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Clients served</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">NGOs, SMEs, e-commerce, churches</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Built for founders, ministries, schools, and fast-moving retail teams.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Code className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Tech & SEO</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">Next.js, WordPress, on-page SEO</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Performance, Core Web Vitals, schema, and analytics set up from day one.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Results</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">More leads, sales, visibility</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Conversion-led pages, faster load times, and SEO foundations that drive traffic.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-6 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Ready to transform your web presence? Let&apos;s design a site that feels premium, loads fast, and converts visitors into loyal customers.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Local expertise</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Web Design Services in Accra</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>Based in Accra, Ghana, we know the local market and deliver websites built for Ghanaian businesses to succeed online.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Business Websites</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Professional sites that establish Accra brands online</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>E-commerce Websites</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Online stores with payment integration for Accra businesses</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Portfolio Websites</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Showcase your work with stunning portfolio sites</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>SEO & Optimization</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Rank higher locally and reach more customers in Accra</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Website Maintenance</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Keep your site secure, fast, and up-to-date</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Speed & Performance</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Fast-loading sites that convert visitors to customers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Recent Projects & Highlights</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>A selection of websites we've built for businesses across e-commerce, media, services, and more.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioHighlights.map((project) => (
                  <div key={project.slug} className="group rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative overflow-hidden h-48 sm:h-40 bg-gray-300 dark:bg-gray-700">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    
                    <div className="flex flex-col flex-grow p-5 space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>{project.category}</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{project.title}</h3>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {project.description}
                      </p>
                      
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm font-medium transition-colors group/link"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        View Case Study
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  View All Projects
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Testimonials</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">What Our Clients Say</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>Real feedback from businesses we've helped succeed online in Accra and beyond.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-orange-500 shadow-lg">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 items-center justify-center text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>{testimonial.name}</p>
                      <p className="text-xs text-orange-500 font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{testimonial.company}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>{testimonial.role}</p>
                    </div>
                    
                    <div className="flex gap-1 mb-3 justify-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-orange-400">★</span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow italic" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      "{testimonial.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}></p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">FAQs</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>Quick answers to the most common questions from Accra clients.</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>How much does web design cost in Accra?</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Most projects start from GHS 4,000 for a lean business site. E-commerce builds typically range from GHS 6,500–12,000 depending on catalog size, integrations, and custom features. You’ll get a clear quote after a quick call.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>How long does it take?</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>A focused business site usually launches in 2–4 weeks. E-commerce projects run 3–6 weeks depending on product setup, payments, and content readiness. We share a clear timeline on day one.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Do you offer SEO?</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Yes. Every build includes on-page SEO, fast performance, mobile optimization, and basic schema. We can add local SEO, blog setup, and content guidance to help you rank in Accra and beyond.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Do you work with small businesses?</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Absolutely. We support founders, SMEs, and growing teams with right-sized packages—clear pricing, fast launches, and ongoing support to keep you online and converting.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6 overflow-hidden">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Local Expertise</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Serving Businesses Across Accra & Greater Accra</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>Based in Accra, we partner with businesses throughout Greater Accra and beyond. We understand the local market and deliver web solutions built for success.</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.123456!2d-0.2163!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sAccra%2C%20Ghana!2s5.6037%2C%20-0.2163!5e0!3m2!1sen!2sgh!4v1673024517388!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 justify-center">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 max-w-xl w-full mx-auto">
                  <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Service Area</p>
                  <p className="text-base text-gray-900 dark:text-white font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Greater Accra Region</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Accra, Tema, Madina, Kasoa, Pokuase, and surrounding areas</p>
                </div>
              </div>

              {/* Related Blog Articles */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Resources</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Related Articles</h2>
                  <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>Learn more about web design, e-commerce, and growing your online business.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Link href="/blog/wordpress-vs-custom-website-ghana-2026">
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                        <img 
                          src="https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=600&fit=crop" 
                          alt="WordPress vs Custom Website"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Web Development</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>WordPress vs Custom Website</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Google Sans, sans-serif' }}>Compare WordPress and custom development to find the best solution for your Ghanaian business in 2026.</p>
                        <div className="mt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm">
                          Read More →
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/blog/ui-ux-design-principles-ghana-websites-2026">
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                        <img 
                          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop" 
                          alt="UI/UX Design Principles"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Web Design</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>UI/UX Design Principles for Ghana</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Google Sans, sans-serif' }}>Master essential UI/UX principles to create user-friendly websites that convert visitors into customers.</p>
                        <div className="mt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm">
                          Read More →
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    View All Articles
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-8 text-center space-y-4">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Ready to Launch Your Web Presence?</h3>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-2xl mx-auto" style={{ fontFamily: 'Google Sans, sans-serif' }}>Join hundreds of Accra-based businesses that have transformed their online presence with our web design services.</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Get a Website Today
                  </Link>

                  <a
                    href="https://wa.me/233530505031?text=Hi%20Celestial,%20I'm%20interested%20in%20getting%20a%20website%20designed%20in%20Accra."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-all shadow-lg shadow-green-500/30"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <WhatsAppButton />
    </>
  );
}
