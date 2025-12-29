import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PremiumCTA from '../../components/PremiumCTA';
import Link from 'next/link';
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Users, Clock, Award } from 'lucide-react';

// Glass Button Component
const GlassButton = ({ children, href, variant = 'light', external = false }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-md border";
  
  const variants = {
    light: "bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl",
    dark: "bg-black/20 hover:bg-black/30 text-gray-900 dark:text-white border-black/20 dark:border-white/20",
    orange: "bg-orange-500/90 hover:bg-orange-600 text-white border-orange-400/50 hover:border-orange-500 shadow-lg hover:shadow-orange-500/25",
    outline: "bg-transparent hover:bg-white/10 text-white border-white/50 hover:border-white"
  };
  
  const Component = external ? 'a' : Link;
  const props = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
  
  return (
    <Component {...props} className={`${baseStyles} ${variants[variant]}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
      {children}
    </Component>
  );
};

// Add a heroImage property for each service
const services = [
  { 
    title: "Web Design",
    slug: "web-design",
    description: "We create stunning, responsive websites that captivate your audience across all devices. Our designs blend modern aesthetics with intuitive user experience, featuring optimal color schemes, strategic layouts, and conversion-oriented elements that reflect your brand identity and maximize engagement.",
    icon: require("lucide-react").Monitor,
    heroImage: "https://www.ntc.edu/sites/default/files/styles/16_9_1600x900/public/2021-06/web-design-header.jpg?itok=KPytPu7S",
    keywords: [
      "responsive web design", "modern website design", "UI design", "mobile-first design",
      "branding", "user experience", "website redesign", "landing page design"
    ],
    details: [
      {
        heading: "Why Invest in Professional Web Design?",
        content: [
          "Your website is your digital storefront—first impressions matter.",
          "A professional design builds trust, credibility, and drives conversions.",
          "Mobile-first and responsive layouts ensure your site looks perfect on every device.",
          "Modern design trends and best practices keep your business ahead of the competition.",
          "SEO-friendly structure and fast loading for better Google rankings."
        ]
      },
      {
        heading: "What We Offer",
        content: [
          "Custom website design for businesses, brands, and startups.",
          "Mobile-first, responsive layouts for all devices.",
          "Branding, color schemes, and typography tailored to your identity.",
          "Wireframes, mockups, and interactive prototypes for a clear vision.",
          "Landing pages, multi-page sites, and redesigns for existing websites.",
          "Conversion-focused layouts and call-to-action strategies.",
          "UI kits and design systems for scalability."
        ]
      },
      {
        heading: "Our Web Design Process",
        content: [
          "1. Discovery & Strategy: We learn about your business, goals, and audience.",
          "2. Research & Inspiration: Competitor analysis and moodboards.",
          "3. Wireframing: Structure and layout planning for optimal user flow.",
          "4. Visual Design: High-fidelity mockups and interactive prototypes.",
          "5. Feedback & Iteration: Collaborative reviews and refinements.",
          "6. Handover: Developer-ready assets or seamless transition to our dev team."
        ]
      },
      {
        heading: "Design Tools & Tech Stack",
        content: [
          {
            name: "Figma",
            url: "https://avatars.githubusercontent.com/u/5155369?s=200&v=4"
          },
          {
            name: "Adobe XD",
            url: "https://cdn.worldvectorlogo.com/logos/adobe-xd-2.svg"
          },
          {
          name: "HTML5",
            url: "https://kinsta.com/wp-content/uploads/2021/03/HTML-5-Badge-Logo.png"
          },
          {
            name: "Framer Motion",
            url: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
          },
          {
            name: "Tailwind CSS",
            url: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
          }
        ]
      },
      {
        heading: "What's Included",
        content: [
          "Bespoke homepage and inner page designs.",
          "Mobile and tablet responsive layouts.",
          "Branding and color palette recommendations.",
          "UI kits and design systems for scalability.",
          "SEO-friendly structure and best practices.",
          "Handover of all design assets and source files.",
          "Free consultation and project strategy session."
        ]
      },
      {
        heading: "Sample Deliverables",
        content: [
          "• Homepage and up to 5 inner pages (more on request)",
          "• Interactive Figma/Adobe XD prototype",
          "• Brand style guide (colors, fonts, logo usage)",
          "• Exported assets (SVG, PNG, JPG, etc)",
          "• Developer handoff with specs and notes"
        ]
      },
      {
        heading: "Pricing",
        content: [
          "Landing Page Design: from $200 (GH₵2,500)",
          "Multi-page Website Design: from $400 (GH₵5,000)",
          "UI/UX Audit & Redesign: from $300 (GH₵3,800)",
          "Branding Package: from $150 (GH  ₵1,900)",
          "Contact us for a custom quote or special requirements."
        ]
      },
      {
        heading: "Why Choose Celestial Web Solutions?",
        content: [
          "Collaborative, transparent process with unlimited feedback rounds.",
          "Focus on conversion, accessibility, and user experience.",
          "Fast turnaround and ongoing support.",
          "Trusted by startups, SMEs, and established brands in Ghana and beyond.",
          "100% satisfaction guarantee—your vision, perfectly realized."
        ]
      },
      {
        heading: "Frequently Asked Questions",
        content: [
          "Q: How long does a typical web design project take?",
          "A: Most projects are completed in 2-4 weeks, depending on scope and feedback cycles.",
          "Q: Can you redesign my existing website?",
          "A: Absolutely! We specialize in website redesigns and UI/UX audits.",
          "Q: Do you offer development as well?",
          "A: Yes, we can handle both design and full-stack development for a seamless experience.",
          "Q: Will my site be mobile-friendly?",
          "A: 100%—all our designs are fully responsive and tested on all devices."
        ]
      }
    ]
  },
  { 
    title: "Web Development",
    slug: "web-development",
    description: "We build robust, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. From simple business websites to complex enterprise systems, we create custom solutions that grow with your business, including CMS platforms, e-learning systems, and API integrations.",
    icon: require("lucide-react").Code,
    heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=90&w=800&auto=format&fit=crop",
    keywords: ["web development", "custom web applications", "React development", "Node.js"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "Custom website and web app development tailored to your business needs.",
          "CMS solutions (WordPress, Headless CMS, etc).",
          "API integrations, payment gateways, and third-party services.",
          "E-learning platforms, booking systems, and more."
        ]
      },
      {
        heading: "Our Approach",
        content: [
          "Discovery & requirements gathering.",
          "UI/UX design and prototyping.",
          "Agile development with regular updates.",
          "Testing, deployment, and ongoing support."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          {
            name: "React",
            url: "https://cdn.worldvectorlogo.com/logos/react-2.svg"
          },
          {
            name: "Next.js",
            url: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
          },
          {
            name: "Node.js",
            url: "https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"
          },
          {
            name: "Express",
            url: "https://cdn.worldvectorlogo.com/logos/express-109.svg"
          },
          {
            name: "MongoDB",
            url: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg"
          },
          {
            name: "PostgreSQL",
            url: "https://cdn.worldvectorlogo.com/logos/postgresql.svg"
          },
          {
            name: "Tailwind CSS",
            url: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
          },
          {
            name: "HTML5",
            url: "https://kinsta.com/wp-content/uploads/2021/03/HTML-5-Badge-Logo.png"
          },
          {
            name: "CSS3",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3iHW9F8U24tel7OWvX4YKDzZH1n8Kt42Zsw&s"
          },
          {
            name: "JavaScript",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRorNhvtDW5k2_HniJ1ltvv_LzRta5lVb1ekQ&s"
          },
          { name: "TypeScript",
            url: "https://cdn.worldvectorlogo.com/logos/typescript.svg"
          },
          {
            name: "Django",
            url: "https://cdn.worldvectorlogo.com/logos/django-community.svg"
          }
        ]
      },
      {
        heading: "Pricing",
        content: [
          "Basic Website: from $170 (GH₵2,500)",
          "Business Website: from $600 (GH₵7,500)",
          "Custom Web App: from $1,200 (GH₵15,000)",
          "E-learning/Booking/Portal: from $1,500 (GH₵19,000)",
          "Contact us for a tailored quote."
        ]
      }
    ]
  },
  { 
    title: "E-Commerce Solutions",
    slug: "ecommerce-solutions",
    description: "We develop high-converting online stores with secure payment gateways, inventory management, and user-friendly interfaces. Our platforms support multiple payment options including mobile money, feature abandoned cart recovery, product recommendations, and comprehensive analytics dashboards.",
    icon: require("lucide-react").ShoppingCart,
    heroImage: "https://admin.wac.co/uploads/What_is_E_commerce_and_What_are_its_Applications_2_d2eb0d4402.jpg",
    keywords: ["e-commerce development", "online store", "payment gateway", "mobile money integration"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "Custom e-commerce website development.",
          "Shopify, WooCommerce, and custom solutions.",
          "Payment gateway integration (Visa, Mobile Money, PayPal, etc).",
          "Inventory, order, and customer management."
        ]
      },
      {
        heading: "Features",
        content: [
          "Abandoned cart recovery, product recommendations.",
          "Discounts, coupons, and loyalty programs.",
          "Analytics dashboards and reporting."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          { name: "Shopify", url: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
          { name: "WooCommerce", url: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg" },
          { name: "Stripe", url: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
          { name: "PayPal", url: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg" },
          { name: "React", url: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
          { name: "Next.js", url: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
          { name: "Node.js", url: "https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" },
          { name: "MongoDB", url: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
          { name: "PostgreSQL", url: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
          { name: "Django", url: "https://cdn.worldvectorlogo.com/logos/django-community.svg" },
          { name: "Tailwind CSS", url: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
          { name: "Paystack", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdsrdSBdYYXvXzieXYJWaBuy_S2jIT26igzw&s" }
        ]
      },
      {
        heading: "Pricing",
        content: [
          "Starter Store: from $350 (GH₵4,000)",
          "Advanced Store: from $900 (GH₵11,000)",
          "Marketplace/Custom: from $1,800 (GH₵22,000)"
        ]
      }
    ]
  },
  { 
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "We elevate your online visibility with data-driven SEO strategies that drive organic traffic and improve search rankings. Our services include keyword research, on-page optimization, technical SEO, local SEO for Ghana, and monthly performance reports showing measurable results.",
    icon: require("lucide-react").Search,
    heroImage: "https://www.intellibright.com/wp-content/uploads/2025/04/Search-Engine-Optimization.jpg",
    keywords: ["SEO services", "search engine optimization", "organic traffic", "local SEO Ghana"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "Comprehensive SEO audits and strategy.",
          "On-page and technical SEO.",
          "Local SEO for Ghana and Africa.",
          "Monthly performance reports."
        ]
      },
      {
        heading: "Our Approach",
        content: [
          "Keyword research and competitor analysis.",
          "Content optimization and link building.",
          "Continuous monitoring and improvement."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          { name: "Google Analytics", url: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
          { name: "Google Search Console", url: "https://cdn.worldvectorlogo.com/logos/google-search-console.svg" },
          { name: "Ahrefs", url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACyCAMAAACnS4D4AAAAzFBMVEX09fY6V/z/jQD3+Pb8/Pb5+fYqTPw4VfwjSPxEYPw0U/y8xPgmSvz/hwDz+fthdvvi5vZsfvv+kyMwUPzq7PbK0PgeRfz40rTQ1feYpPl5ivv5xZbb3/cxUfz/hACUoPp1hfuttflVbPv6vIqeqvn08Omlr/nv8fb32sGFlPq6wvhPZ/vL0fi2vvje4vfT2Pdec/tAXPyDkvpSafv9nj724dAUQP14iPv6w5P16df5zaz6un/7sW38qF/+kwn9oUX9pVL+mjD/ewAANf0Q8Au1AAAIN0lEQVR4nO2ba3+ayhaHMQwDIqIpYIyKRuMl1luSNulumja7Z3//73RALjPc3SLac37/501egAt8MgxrzSwFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP9LCOMi1xclEkO8yH2kIT73Au7M81+dmNZ4xG5hfxuDP8aO9GSoPq/tc98Vsa6pRg1b5el0/xw5dbnmo5xdTq+j1hJokONe+pEm1UDOHnKb6gZyHMS2IkNO1oWnRqobyHEgq/SBAzkObS3UIVNqMF4hR7RCObLRMBeM86eimVxKjjQO31XG6DKFSzGXkkNG4XxMG9L5rrtHL8I/j5djSjGSssT4KVkne/Wk8629v4lIpGeHM/CapIdxLuZVouLCL09T7ugIXm6KSMqh40aUz7v4vYhWIxOLnSwScTBetuoGdXl67N02TBIdHuQurByMaeo1JanduO216jL1qK2uR+OBWH6U6ffDZj5XekJOjcbo3MbvhEyU+EkBynU4c5Dt6EmhtirvQ8s1VTWoNhkv+KmFXLOyyuCvufTOkhbzleLWpLJ/f3JNdsIo9alQVo9+37zK51OKnDjGNCGnlVIpeqh3/neXzF7HSAZVKZ1zTwUvJ3JNb3YmDUpTb0ymRqPk/H1BOcRSM1JfWXtchHby5ZB5J/Ouap2SE/jl5JBGJzugvVocJEfs5rhxJJdLhS4mR1pnlJO+nVbwSOTKkVaZl9mf81zqwbrcyJHz3Div7bFULEfcKblBZKOMm4vJIcuM+YZ9sSBSjhzptiCKZpXJd04lx8m/PA6TI5oaF022qaYpmkb5z9CNVCgnchUniothc5GT/7V/Jyc9z8mXYxtR1Ocw50uTI0ewHTmE/5fbtDdeD7YDa97i5iHVn3V4OVRhvDp5DnniZK6W483nz5v5s22zIN/KTDr6w1/9FP5q5smxl6MohupnZlpnkZSj2hGoI0d6Yha054WT7btIZFBnH/NDcXJow2wznDfRwuayduLXFkS4C+2oj+Vm5FRmuXIUM7a7Fr5PwxmQk0OtRQxnImVrNHTJ3b9kctK8+YKTo60lkeEcM8OCXWVptyAKYQy5XkGpWiAnVpWLuXK0buIGpTnNuH1pEx5x8uR9JE5ObHoV22w1g59cyLKjBfzxcpKV9jc2ruax2w+LAdsbUofJoWM+TNsKKechlYrl8LFie7rMhf+kHCgn6jjy8J2aiuUI7AN27Ahb21InRY+VwOTY5XLhA2DrW98rlSNuw8RWXvFzrAMJV0XlemJCjssxw6JeprsTLXAlcYXMXh7e+j/ef3791Rzm5zml5XTZmvmX7SDCds4yIC9SjhwpPNUpMpeNrbnvk5GkEz5Nui7e3H9cNYex9K86OQ3KfSklSuhGlgvlkAmXatrU+Wz9sTeaf163xdOMI12/+TvFSZVyuPd1DofIWdrxD6mqYVBNMVqjtVT6Na4/fMqvrqqQMz5EziGPVUPL+KisGlptKpQbPfqPYa6aauTMDxo5xROysEhZZmUBaH1bqu78WVSUX06OXxflyiHTrKHjhaAldtj0ftG4uaScu2I5znVyQ6mt49MfMWPcFCxZnEdOsL2QKyejIy6kk9hROxS934w5cV9bv35/vP+oNAnkJ2TZyKIzLsyQ98fX1xq1swQdv72uf+XNDH+/v928zGZuiixVK4e9yuXV9DaD0bZ4Qt5fnZib5RdF0ei+3TQqR50cK4eroK6a9zNuY7za2opLAp1JoWBPvVCO4G2zt3eN8fT5evKkaZHk50g3wgubjpsPOn+kYjlrrnwoetkeIseL6rUTCKa15Bao6ZFbV/pNqKD5M+KmajkDVngW/mcPlsPCkwGb045tl9HfmJy3c8oRFmyfUin6z/57OZGyQtmWlxN9qoRqJ2SnmpYP/sJ5crgmoGh8NuMfLaefJUd/r3iZlH3h+LtWZMv2iX2rxErgbhwwjxw4hRy2AdO84eTos49qk0C+la1WixwVu6uJz6owz5E2r0G3zmtktZXLMpX2UW4iI4dNyLrztPG5YRVyRK6ajg4d0gp/GaOsi/Ic0WK7D/OMhqej31Zszrlq9oMdq/6vaNpcyRqyyTUcaSPB39QTJTJi75lO4osmHyuWEqiDIIgTZcOVo8e54V/ljp3f929vb/cfiWWvSuRENsCN2nKzHgwGO2v+hbkJNisPW2B3hkhvH2Swa0wfubbuL6fIkIPKKkElcsToKpXbSOBicMqCnagD15Dd9QkvCOWj2L2ja6tPSRfnkSOIOT0bXqRgsshdJs3owEgqPkJOP3upq1mtHMnK61ercfN07sgpXG/tHN/4Jmaq+XhoVipHIM+530u2g6bA3AzZTO8kDTn+qXKn5PSVwOZXYTasVo4g5q3hyR0reBzyl0lH+UNHK/NDBP0+zc7wXa9ejiDeZbZMysqGNXLn1lbiJKfxTVasUrszen8Yn3ea+yq0ejkCGRupT4VMa132NBTIWbS0DMUyVddlu7S//83rcd7mP2aujtl/hh5he7/dCTYl/4nVK+I/wZHOa9DZNWFnZ/5mTBLcznw10leqGsrTnG/MJ63XMFLqMummrhjRGDVZdsOU7+939Lzc/w5bAX++zfSM80zGAYdyzuaQpMH8W12lit9qRGut2/hOJRdpkR5jN71+st2OS81Ldai6upt2T/DLEBenaPj+4PB9xhZKz4X7E6BFe9B1G412W1M6Zo+bxWhYVne3bQun+k2Rj35+LxwnaDWKdgsCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B/nv+T44mZltO6gAAAAAElFTkSuQmCC" },
          { name: "SEMrush", url: "data:image/png;base64,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" },
        ]
      },
      {
        heading: "Pricing",
        content: [
          "SEO Audit: from $120 (GH₵1,500)",
          "Monthly SEO Package: from $60 (GH₵800)",
          "Local SEO: from $180 (GH₵2,300)"
        ]
      }
    ]
  },
  { 
    title: "UX/UI Design",
    slug: "ux-ui-design",
    description: "We craft exceptional user experiences through thoughtful design that combines beauty with functionality. Our process includes user research, wireframing, interactive prototypes, and usability testing to create intuitive, accessible interfaces that work seamlessly across all platforms.",
    icon: require("lucide-react").Palette,
    heroImage: "https://designmaniac.in/wp-content/uploads/2023/02/ui-ux.png",
    keywords: ["UX design", "UI design", "user experience", "wireframing", "usability testing"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "User research and persona development.",
          "Wireframes, mockups, and interactive prototypes.",
          "Usability testing and accessibility audits.",
          "UI kits and design systems."
        ]
      },
      {
        heading: "Tools & Tech Stack",
        content: [
          { name: "Figma", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa54MKk4H1Gvj4AN46AGs2-qeIYpOvOUo5vQ&s" },
          { name: "Adobe XD", url: "https://cdn.worldvectorlogo.com/logos/adobe-xd-2.svg" },
          { name: "Sketch", url: "https://cdn.worldvectorlogo.com/logos/sketch-2.svg" },
          { name: "InVision", url: "https://cdn.worldvectorlogo.com/logos/invision.svg" },
          { name: "Framer", url: "https://i.pinimg.com/736x/b2/44/8c/b2448c6183e4a6c6bb9a1a22093905f3.jpg" }
        ]
      },
      {
        heading: "Pricing",
        content: [
          "UX Audit: from $100 (GH₵1,300)",
          "UI/UX Design for Website: from $350 (GH₵4,500)",
          "App UI/UX: from $500 (GH₵6,200)"
        ]
      }
    ]
  },
  { 
    title: "IT Support",
    slug: "it-support",
    description: "We provide comprehensive IT support to keep your business technology running smoothly. From system setup and maintenance to troubleshooting, security implementations, and technology consulting, we ensure your technology enables business growth rather than causing downtime.",
    icon: require("lucide-react").Headphones,
    heroImage: "https://res.cloudinary.com/jerrick/image/upload/v1738225878/679b38d615e36b001df71563.webp",
    keywords: ["IT support", "technical support", "system maintenance", "cybersecurity"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "System setup and maintenance.",
          "Troubleshooting and technical support.",
          "Cybersecurity and data protection.",
          "Technology consulting and training."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          { name: "Windows Server", url: "https://cdn.worldvectorlogo.com/logos/microsoft-windows-22.svg" },
          { name: "Cloudflare", url: "https://cdn.worldvectorlogo.com/logos/cloudflare-1.svg" },
          { name: "Norton", url: "https://cdn.worldvectorlogo.com/logos/norton-1.svg" },
          { name: "Google Workspace", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cv1HKhknP3YyBra1OqqqDhIIGtpmNSrfhQ&s" },
          { name: "Microsoft 365", url: "https://www.popu.se/wp-content/uploads/2025/02/microsoft-3652260.logowik.com_.webp"}
        ]
      },
      {
        heading: "Pricing",
        content: [
          "Basic Support: from $60/mo (GH₵750/mo)",
          "On-Demand Support: from $30/hr (GH₵380/hr)",
          "Consulting: from $100 (GH₵1,300)"
        ]
      }
    ]
  },
  { 
    title: "Google AdSense Management",
    slug: "google-adsense-management",
    description: "We maximize your website revenue through strategic AdSense optimization. Our services include ad placement optimization, A/B testing, content strategy development, performance monitoring, and policy compliance to ensure sustainable revenue growth from your website traffic.",
    icon: require("lucide-react").Target,
    heroImage: "https://new.growketing.com/wp-content/uploads/2022/11/98-%C2%BFQue-es-y-como-aprovechar-al-maximo-Google-AdSense_.jpg",
    keywords: ["Google AdSense", "ad revenue optimization", "website monetization", "content monetization"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "Ad placement and layout optimization.",
          "A/B testing and performance monitoring.",
          "Content strategy for higher revenue.",
          "AdSense policy compliance."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          { name: "Google AdSense", url: "https://cdn.worldvectorlogo.com/logos/google-adsense.svg" },
          { name: "Google Analytics", url: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
          { name: "Google Tag Manager", url: "data:image/jpeg;base64,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" }
        ]
      },
      {
        heading: "Pricing",
        content: [
          "AdSense Setup: from $100 (GH₵1,300)",
          "Optimization Package: from $120 (GH₵1,500)",
        ]
      }
    ]
  },
  { 
    title: "Google Ads Management",
    slug: "google-ads-management",
    description: "We drive targeted traffic and maximize conversions through expertly managed Google Ads campaigns. Our certified specialists handle strategy, keyword research, ad creation, bid management, and continuous optimization across Search, Display, Shopping, and Video campaigns to maximize your ROI.",
    icon: require("lucide-react").MousePointer,
    heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI23FVIbMh2YmJeuWfIldox2fhWDLkv6P8ww&s",
    keywords: ["Google Ads", "PPC management", "paid advertising", "campaign management"],
    details: [
      {
        heading: "What We Offer",
        content: [
          "Google Ads campaign setup and management.",
          "Search, Display, Shopping, and Video campaigns.",
          "Keyword research and ad copywriting.",
          "Bid management and conversion tracking."
        ]
      },
      {
        heading: "Tech Stack",
        content: [
          { name: "Google Ads", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtz4Jb9cqEDCVPS7TfRQs0uiOOc6Ec_gtFvPpTgaTBA&s" },
          { name: "Google Analytics", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUIGkGS6jhACPzlGFSPQDlA9Rmo5gVlm0gA&s" },
          { name: "Google Tag Manager", url: "data:image/jpeg;base64,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" },
        ]
      },
      {
        heading: "Pricing",
        content: [
          "Campaign Setup: from $120 (GH₵1,500)",
          "Monthly Management: from $200/mo (GH₵2,500/mo)",
          "Consulting: from $80 (GH₵1,000)"
        ]
      }
    ]
  }
];

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-orange-600" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Service Not Found</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Google Sans, sans-serif' }}>Sorry, the service you are looking for does not exist.</p>
          <GlassButton href="/services" variant="orange">
            Back to Services <ArrowRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | Celestial Web Solutions</title>
        <meta name="description" content={service.description} />
        <meta name="keywords" content={service.keywords.join(', ')} />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero Section - Full Width Image Background */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={service.heroImage}
              alt={`${service.title} hero background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Link */}
              <Link 
                href="/services" 
                className="text-white/80 hover:text-white mb-8 inline-flex items-center gap-2 transition font-medium group"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to All Services
              </Link>

              {/* Service Icon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6"
              >
                {service.icon && <service.icon className="w-10 h-10 text-white" />}
              </motion.div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {service.title}
              </h1>
              
              <p
                className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                {service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <GlassButton href="/contact" variant="orange">
                  Get Started <ArrowRight className="w-4 h-4" />
                </GlassButton>
                <GlassButton href="/portfolio" variant="light">
                  View Our Work
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Keywords/Tags Bar */}
        <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {service.keywords.map((keyword, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="text-sm px-4 py-2 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 rounded-full font-medium border border-orange-200 dark:border-orange-800/50 shadow-sm"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              {service.details && service.details.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
                >
                  <h2 
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  
                  {/* Render tech stack/tools with logos if present */}
                  {Array.isArray(section.content) && section.content.length > 0 && typeof section.content[0] === 'object' && section.content[0].url ? (
                    <div className="flex flex-wrap gap-6">
                      {section.content.map((tech, i) => (
                        <motion.div 
                          key={i} 
                          className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <img src={tech.url} alt={tech.name} className="w-12 h-12 object-contain mb-2" loading="lazy" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Google Sans, sans-serif' }}>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                          style={{ fontFamily: "Google Sans, sans-serif" }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Quick Stats Card - With Service Background Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.heroImage}
                      alt={`${service.title} background`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 via-orange-500/90 to-orange-600/95"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 text-white">
                    <h3
                      className="text-xl font-bold mb-6"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Why Choose Us
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Fast Delivery</p>
                          <p className="text-orange-200 text-sm">2-4 weeks turnaround</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>20+ Happy Clients</p>
                          <p className="text-orange-200 text-sm">Trusted globally</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>24/7 Support</p>
                          <p className="text-orange-200 text-sm">Always here to help</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Quality Guaranteed</p>
                          <p className="text-orange-200 text-sm">100% satisfaction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Get Quote Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Ready to Get Started?
                  </h3>
                  <p 
                    className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Get a free consultation and custom quote for your project.
                  </p>
                  <GlassButton href="/contact" variant="orange" className="w-full">
                    Get Free Quote <ArrowRight className="w-4 h-4" />
                  </GlassButton>
                </motion.div>

                {/* Other Services Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <h3 
                    className="text-lg font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Explore Other Services
                  </h3>
                  <div className="space-y-3">
                    {services.filter(s => s.slug !== slug).slice(0, 4).map((s, idx) => (
                      <Link 
                        key={idx}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <s.icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                        </div>
                        <span 
                          className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" 
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-500/95"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Let's Build Something Amazing
              </h2>
              <p
                className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Ready to transform your business with our {service.title.toLowerCase()} expertise? Get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </GlassButton>
                <GlassButton href="/services" variant="outline">
                  View All Services
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </>
  );
}