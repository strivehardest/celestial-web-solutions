// Course data structure
export const courses = [
  {
    id: 1,
    slug: 'learn-wordpress-course',
    title: 'WordPress Mastery - Build Professional Websites Without Coding',
    subtitle: 'Build professional websites without coding',
    description: `Learn WordPress Course is a practical, step-by-step training designed to help you build and manage your own website confidently. Whether you're starting a blog, launching a business website, creating an online store, or setting up a portfolio, this course walks you through everything in a simple, beginner-friendly way.

You'll learn how to buy a domain and hosting, install WordPress, set up pages, install themes, customise your theme, design your site with Elementor, install essential plugins, improve speed, strengthen security, perform SEO and manage updates without stress. No coding, no tech overwhelm; just real-world steps you can follow immediately.

By the end of the course, you'll have a fully functional, beautiful, and optimised WordPress website, plus the skills to manage it on your own. This course is perfect for tech persons, small businesses, creators, freelancers, and anyone ready to take control of their online presence via WordPress development.`,
    thumbnail: '/courses/wordpress.png',
    price: 150,
    originalPrice: 195,
    discount: 23,
    currency: 'GH₵',
    duration: '180 minutes',
    level: 'Beginner',
    language: 'English',
    rating: 4.86,
    reviewCount: 0,
    studentCount: 0,
    lastUpdated: 'Jan 2026',
    modeOfStudies: ['Online Videos', 'Face to Face', 'Google Meet', 'Zoom', 'Teams'],
    instructor: {
      name: 'Waliu Aforlabi',
      title: 'Senior Web Developer',
      bio: 'Waliu is a senior web developer with 4+ years of experience building responsive, user-friendly, and SEO-optimised websites for businesses across Ghana and beyond. He specialises in custom WordPress themes, plugin development, site performance optimisation, and helping entrepreneurs create powerful online presences that drive results.',
      image: '/founder-waliu.png',
      rating: 5.0,
      students: 2,
      courses: 4
    },
    whatYouLearn: [
      'Purchase a domain and hosting',
      'Create business email and subdomains',
      'Install and set up WordPress',
      'Choose and customize a professional WordPress theme',
      'Build pages using drag-and-drop builders like Elementor or Gutenberg',
      'Create menus, headers, footers, and site structure that\'s user-friendly',
      'Install and configure essential plugins for SEO, speed, backups, and security',
      'Set up a blog and publish posts with proper formatting',
      'Manage website updates, backups, and general maintenance',
      'Improve your website\'s speed and mobile responsiveness',
      'Launch a polished, professional website with confidence'
    ],
    requirements: [
      'A laptop or desktop with internet access',
      'Basic computer skills (clicking, typing, navigating websites)',
      'A hosting account and domain name (recommended but not required for practice)'
    ],
    includes: [
      '180 minutes on-demand video',
      '1 Year course access',
      'Certificate of completion',
      'Access to course community',
      'Exclusive mentorship for 1 month'
    ],
    resources: [
      {
        title: 'Why WordPress Web Design is Popular in South Africa',
        url: 'https://www.webpartner.co.za/blog/why-wordpress-web-design-is-popular-in-south-africa/'
      }
    ],
    curriculum: [
      {
        section: 'Getting Started with WordPress',
        lessons: [
          { title: 'Introduction to WordPress', duration: '10 min', free: true },
          { title: 'Understanding Domain and Hosting', duration: '15 min', free: true },
          { title: 'Purchasing Domain and Hosting', duration: '20 min', free: false },
          { title: 'Setting Up cPanel and Email Accounts', duration: '18 min', free: false },
          { title: 'Installing WordPress via Softaculous', duration: '15 min', free: false },
          { title: 'WordPress Initial Configuration', duration: '12 min', free: false }
        ]
      },
      {
        section: 'WordPress Basics',
        lessons: [
          { title: 'WordPress Dashboard Tour', duration: '12 min', free: false },
          { title: 'Understanding Posts vs Pages', duration: '10 min', free: false },
          { title: 'Creating Your First Post', duration: '15 min', free: false },
          { title: 'Creating Pages', duration: '12 min', free: false },
          { title: 'Categories and Tags Management', duration: '10 min', free: false },
          { title: 'Media Library Management', duration: '14 min', free: false },
          { title: 'Comments Management', duration: '8 min', free: false }
        ]
      },
      {
        section: 'Themes and Design',
        lessons: [
          { title: 'Choosing the Right Theme', duration: '15 min', free: false },
          { title: 'Installing and Activating Themes', duration: '10 min', free: false },
          { title: 'Theme Customization Basics', duration: '20 min', free: false },
          { title: 'Understanding Theme Options', duration: '12 min', free: false },
          { title: 'Working with Elementor Page Builder', duration: '25 min', free: false },
          { title: 'Creating Custom Headers and Footers', duration: '18 min', free: false },
          { title: 'Customizing Colors and Fonts', duration: '14 min', free: false },
          { title: 'Mobile Responsive Design', duration: '16 min', free: false }
        ]
      },
      {
        section: 'Essential Plugins',
        lessons: [
          { title: 'Understanding WordPress Plugins', duration: '8 min', free: false },
          { title: 'Installing Essential SEO Plugins (Yoast/RankMath)', duration: '15 min', free: false },
          { title: 'Security Plugins - Wordfence Setup', duration: '18 min', free: false },
          { title: 'Backup Solutions - UpdraftPlus', duration: '16 min', free: false },
          { title: 'Performance Optimization - WP Rocket', duration: '20 min', free: false },
          { title: 'Contact Form Plugins', duration: '12 min', free: false },
          { title: 'Image Optimization Plugins', duration: '10 min', free: false },
          { title: 'Anti-Spam Protection', duration: '8 min', free: false }
        ]
      },
      {
        section: 'Advanced Features',
        lessons: [
          { title: 'Creating Navigation Menus', duration: '12 min', free: false },
          { title: 'Mega Menus Setup', duration: '14 min', free: false },
          { title: 'Setting Up Contact Forms', duration: '15 min', free: false },
          { title: 'Adding Social Media Integration', duration: '10 min', free: false },
          { title: 'Creating Custom Sidebars', duration: '12 min', free: false },
          { title: 'Widget Management', duration: '10 min', free: false },
          { title: 'SEO Best Practices', duration: '20 min', free: false },
          { title: 'Google Analytics Integration', duration: '15 min', free: false },
          { title: 'Setting Up Blog Categories', duration: '8 min', free: false }
        ]
      },
      {
        section: 'E-commerce with WooCommerce',
        lessons: [
          { title: 'Introduction to WooCommerce', duration: '12 min', free: false },
          { title: 'Installing and Configuring WooCommerce', duration: '18 min', free: false },
          { title: 'Adding Products and Categories', duration: '20 min', free: false },
          { title: 'Payment Gateway Setup', duration: '16 min', free: false },
          { title: 'Shipping Configuration', duration: '14 min', free: false },
          { title: 'Managing Orders', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Launch and Maintenance',
        lessons: [
          { title: 'Pre-Launch Checklist', duration: '15 min', free: false },
          { title: 'Website Speed Optimization', duration: '18 min', free: false },
          { title: 'Image Optimization Techniques', duration: '12 min', free: false },
          { title: 'Caching Setup', duration: '14 min', free: false },
          { title: 'Mobile Responsiveness Testing', duration: '12 min', free: false },
          { title: 'SSL Certificate Installation', duration: '10 min', free: false },
          { title: 'Regular Backups Strategy', duration: '12 min', free: false },
          { title: 'Ongoing Maintenance and Updates', duration: '15 min', free: false },
          { title: 'Troubleshooting Common Issues', duration: '18 min', free: false },
          { title: 'WordPress Security Best Practices', duration: '16 min', free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Ama Owusu',
        rating: 5,
        date: '2 weeks ago',
        title: 'Excellent course! Very detailed and easy to follow',
        text: 'This course is perfect for beginners. Waliu explains everything step by step. I was able to build my business website without any coding knowledge. Highly recommended!'
      },
      {
        id: 2,
        author: 'Kwesi Mensah',
        rating: 5,
        date: '1 month ago',
        title: 'Life-changing course',
        text: 'I started with zero web development knowledge and now I have a fully functional WordPress site for my online store. The WhatsApp support is amazing too!'
      },
      {
        id: 3,
        author: 'Zainab Mohammed',
        rating: 4,
        date: '6 weeks ago',
        title: 'Great content, very practical',
        text: 'The lessons are well-structured and the practical examples are really helpful. I would have liked more on advanced SEO techniques, but overall great value.'
      },
      {
        id: 4,
        author: 'David Boateng',
        rating: 5,
        date: '2 months ago',
        title: 'Best WordPress course I have taken',
        text: 'Comprehensive and beginner-friendly. The community access is a great bonus. I got all my questions answered quickly.'
      },
      {
        id: 5,
        author: 'Akosua Anane',
        rating: 5,
        date: '3 months ago',
        title: 'Professional and affordable',
        text: 'Amazing course at an affordable price. I now have the confidence to manage my website on my own without hiring expensive developers.'
      },
      {
        id: 6,
        author: 'Samuel Oppong',
        rating: 4,
        date: '3 months ago',
        title: 'Very informative',
        text: 'Covered all the basics and some advanced topics. The instructor is knowledgeable and responds to questions. Perfect for anyone starting out.'
      },
      {
        id: 7,
        author: 'Yaa Adu',
        rating: 5,
        date: '4 months ago',
        title: 'Transformed my business',
        text: 'After completing this course, I launched my website successfully. The mentorship support for the first month was invaluable. Thank you, Waliu!'
      }
    ]
  },
  {
    id: 2,
    slug: 'nextjs-complete-guide',
    title: 'Complete Next.js Developer Course',
    subtitle: 'Master modern web development with Next.js and React',
    description: `Master Next.js and build production-ready web applications from scratch. This comprehensive course covers everything from the basics to advanced topics like server-side rendering, static site generation, API routes, and deployment strategies.

Learn to build fast, SEO-friendly, and scalable web applications using the latest features of Next.js 14. Perfect for developers who want to level up their React skills and build modern web applications.`,
    thumbnail: '/courses/next.webp',
    price: 250,
    originalPrice: 350,
    discount: 29,
    currency: 'GH₵',
    duration: '8 hours',
    level: 'Intermediate',
    language: 'English',
    rating: 4.92,
    reviewCount: 0,
    studentCount: 0,
    lastUpdated: 'Jan 2026',
    modeOfStudies: ['Online Videos', 'Face to Face', 'Google Meet', 'Zoom', 'Teams'],
    instructor: {
      name: 'Waliu Aforlabi',
      title: 'Senior Web Developer',
      bio: 'Waliu is a senior web developer with 4+ years of experience building responsive, user-friendly, and SEO-optimised websites. He has a deep passion for modern web technologies, specialising in React, Next.js, and helping developers build scalable, production-ready applications.',
      image: '/founder-waliu.png',
      rating: 5.0,
      students: 2,
      courses: 4
    },
    whatYouLearn: [
      'Build production-ready Next.js applications',
      'Understand Server-Side Rendering (SSR) and Static Site Generation (SSG)',
      'Create API routes and backend functionality',
      'Implement authentication and authorization',
      'Optimize performance and SEO',
      'Deploy to Vercel and other platforms',
      'Work with databases and ORMs',
      'Build full-stack applications with Next.js'
    ],
    requirements: [
      'Basic knowledge of React',
      'Understanding of JavaScript ES6+',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    includes: [
      '8 hours on-demand video',
      'Lifetime course access',
      'Certificate of completion',
      'Source code access',
      'Community support'
    ],
    curriculum: [
      {
        section: 'Introduction to Next.js',
        lessons: [
          { title: 'What is Next.js?', duration: '12 min', free: true },
          { title: 'Next.js vs Create React App', duration: '10 min', free: true },
          { title: 'Setting Up Development Environment', duration: '15 min', free: true },
          { title: 'Creating Your First Next.js App', duration: '20 min', free: false },
          { title: 'Project Structure Overview', duration: '14 min', free: false }
        ]
      },
      {
        section: 'Pages and Routing',
        lessons: [
          { title: 'File-based Routing', duration: '18 min', free: false },
          { title: 'Dynamic Routes', duration: '22 min', free: false },
          { title: 'Nested Routes', duration: '15 min', free: false },
          { title: 'Link Component and Navigation', duration: '12 min', free: false },
          { title: 'useRouter Hook', duration: '16 min', free: false },
          { title: 'Catch-all Routes', duration: '14 min', free: false }
        ]
      },
      {
        section: 'Data Fetching',
        lessons: [
          { title: 'Understanding SSR and SSG', duration: '18 min', free: false },
          { title: 'getStaticProps', duration: '20 min', free: false },
          { title: 'getStaticPaths', duration: '22 min', free: false },
          { title: 'getServerSideProps', duration: '20 min', free: false },
          { title: 'Incremental Static Regeneration', duration: '18 min', free: false },
          { title: 'Client-side Data Fetching', duration: '16 min', free: false }
        ]
      },
      {
        section: 'API Routes',
        lessons: [
          { title: 'Creating API Routes', duration: '16 min', free: false },
          { title: 'Dynamic API Routes', duration: '18 min', free: false },
          { title: 'API Middleware', duration: '20 min', free: false },
          { title: 'Connecting to Databases', duration: '25 min', free: false },
          { title: 'Authentication with NextAuth', duration: '30 min', free: false }
        ]
      },
      {
        section: 'Styling',
        lessons: [
          { title: 'CSS Modules', duration: '14 min', free: false },
          { title: 'Styled Components', duration: '16 min', free: false },
          { title: 'Tailwind CSS Integration', duration: '18 min', free: false },
          { title: 'Global Styles', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Optimization',
        lessons: [
          { title: 'Image Optimization', duration: '20 min', free: false },
          { title: 'Font Optimization', duration: '12 min', free: false },
          { title: 'Script Optimization', duration: '14 min', free: false },
          { title: 'Code Splitting', duration: '16 min', free: false },
          { title: 'Performance Monitoring', duration: '18 min', free: false }
        ]
      },
      {
        section: 'Deployment',
        lessons: [
          { title: 'Deploying to Vercel', duration: '16 min', free: false },
          { title: 'Environment Variables', duration: '12 min', free: false },
          { title: 'Custom Domain Setup', duration: '14 min', free: false },
          { title: 'Production Best Practices', duration: '18 min', free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Ama Owusu',
        rating: 5,
        date: '2 weeks ago',
        title: 'Game-changer for web development',
        text: 'This Next.js course is comprehensive and well-structured. I learned SSR, SSG, and deployment. Now I can build production-ready applications with confidence!'
      },
      {
        id: 2,
        author: 'Kwesi Mensah',
        rating: 5,
        date: '3 weeks ago',
        title: 'Advanced concepts made simple',
        text: 'I took several React courses before but Next.js felt overwhelming. This course breaks down complex concepts perfectly. Highly recommended for intermediate developers.'
      },
      {
        id: 3,
        author: 'Zainab Mohammed',
        rating: 5,
        date: '1 month ago',
        title: 'Best investment for my tech career',
        text: 'The knowledge I gained has helped me land a better job. The instructor really knows his stuff and explains everything clearly.'
      },
      {
        id: 4,
        author: 'David Boateng',
        rating: 4,
        date: '6 weeks ago',
        title: 'Thorough and practical',
        text: 'Great course with practical examples. I wish there were more projects to build along the way, but the content is solid.'
      },
      {
        id: 5,
        author: 'Akosua Anane',
        rating: 5,
        date: '2 months ago',
        title: 'Complete guide to modern web development',
        text: 'Perfect for anyone looking to master Next.js. The API routes section alone is worth the price. Great value!'
      },
      {
        id: 6,
        author: 'Samuel Oppong',
        rating: 5,
        date: '2 months ago',
        title: 'From React to Next.js expert',
        text: 'This course took me from being just a React developer to understanding full-stack development with Next.js. Amazing!'
      },
      {
        id: 7,
        author: 'Yaa Adu',
        rating: 5,
        date: '3 months ago',
        title: 'Comprehensive and inspiring',
        text: 'I started building my own SaaS project using Next.js right after this course. The knowledge was directly applicable. Waliu is an excellent instructor!'
      },
      {
        id: 8,
        author: 'Kwame Asante',
        rating: 5,
        date: '3 months ago',
        title: 'Professional-grade content',
        text: 'This is the kind of content you usually find in expensive bootcamps. Great work by Waliu!'
      },
      {
        id: 9,
        author: 'Comfort Addo',
        rating: 4,
        date: '4 months ago',
        title: 'Excellent fundamentals and advanced topics',
        text: 'The progression from basics to advanced is perfect. The deployment section was particularly helpful.'
      },
      {
        id: 10,
        author: 'Kofi Mensah',
        rating: 5,
        date: '4 months ago',
        title: 'Exactly what I needed',
        text: 'Been coding for years but was struggling with Next.js. This course changed everything. The structure is perfect!'
      },
      {
        id: 11,
        author: 'Abena Yeboah',
        rating: 5,
        date: '5 months ago',
        title: 'Worth every cedi',
        text: 'Best web development course I have taken. The instructor is responsive and the content is updated regularly.'
      },
      {
        id: 12,
        author: 'Nana Osei',
        rating: 5,
        date: '5 months ago',
        title: 'Life-changing course',
        text: 'I went from freelancer earning little to now getting high-paying projects. Thank you, Waliu!'
      },
      {
        id: 13,
        author: 'Ekua Appiah',
        rating: 5,
        date: '6 months ago',
        title: 'Clear explanations and great teaching',
        text: 'The way Waliu breaks down Next.js concepts is amazing. Every lesson was engaging and informative.'
      },
      {
        id: 14,
        author: 'Yaw Brobbey',
        rating: 4,
        date: '6 months ago',
        title: 'Solid course with practical value',
        text: 'All concepts are well explained with real-world examples. Would love more case studies but overall excellent.'
      },
      {
        id: 15,
        author: 'Ama Mensah',
        rating: 5,
        date: '7 months ago',
        title: 'Professional-quality instruction',
        text: 'This course teaches you how to think like a real Next.js developer. Highly valuable investment in your career!'
      }
    ]
  },
  {
    id: 3,
    slug: 'web-design-fundamentals',
    title: 'Web Design Fundamentals',
    subtitle: 'Learn to design beautiful and user-friendly websites',
    description: `Learn the fundamentals of web design including UI/UX principles, color theory, typography, layout design, and responsive design. This course will teach you how to create visually appealing and user-friendly websites that convert visitors into customers.

Perfect for beginners who want to start a career in web design or business owners who want to design their own websites.`,
    thumbnail: '/courses/web-design.jpg',
    price: 120,
    originalPrice: 180,
    discount: 33,
    currency: 'GH₵',
    duration: '4 hours',
    level: 'Beginner',
    language: 'English',
    rating: 4.78,
    reviewCount: 0,
    studentCount: 0,
    lastUpdated: 'Jan 2026',
    modeOfStudies: ['Online Videos', 'Face to Face', 'Google Meet', 'Zoom', 'Teams'],
    instructor: {
      name: 'Waliu Aforlabi',
      title: 'Senior Web Developer',
      bio: 'Waliu is a senior web developer and UI/UX enthusiast with 4+ years of experience building responsive, user-friendly, and SEO-optimised websites. He is passionate about teaching design principles and helping beginners transform their creative ideas into beautiful, functional websites.',
      image: '/founder-waliu.png',
      rating: 5.0,
      students: 2,
      courses: 4
    },
    whatYouLearn: [
      'UI/UX design principles',
      'Color theory and psychology',
      'Typography fundamentals',
      'Layout and grid systems',
      'Responsive design techniques',
      'Design tools (Figma, Adobe XD)',
      'Creating wireframes and prototypes',
      'Design trends and best practices'
    ],
    requirements: [
      'No prior experience required',
      'A computer with internet access',
      'Willingness to learn and practice'
    ],
    includes: [
      '4 hours on-demand video',
      '1 Year course access',
      'Certificate of completion',
      'Design templates',
      'Community support'
    ],
    curriculum: [
      {
        section: 'Introduction to Web Design',
        lessons: [
          { title: 'What is Web Design?', duration: '10 min', free: true },
          { title: 'The Design Process', duration: '15 min', free: true },
          { title: 'Tools and Resources', duration: '12 min', free: false },
          { title: 'Setting Up Your Design Workspace', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Design Principles',
        lessons: [
          { title: 'Visual Hierarchy', duration: '16 min', free: false },
          { title: 'Balance and Alignment', duration: '14 min', free: false },
          { title: 'Contrast and Emphasis', duration: '12 min', free: false },
          { title: 'White Space Usage', duration: '10 min', free: false },
          { title: 'Consistency in Design', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Color Theory',
        lessons: [
          { title: 'Understanding Color Psychology', duration: '18 min', free: false },
          { title: 'Color Schemes and Palettes', duration: '16 min', free: false },
          { title: 'Creating Brand Colors', duration: '14 min', free: false },
          { title: 'Accessibility and Color Contrast', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Typography',
        lessons: [
          { title: 'Font Basics', duration: '12 min', free: false },
          { title: 'Choosing the Right Fonts', duration: '16 min', free: false },
          { title: 'Font Pairing', duration: '14 min', free: false },
          { title: 'Readability and Legibility', duration: '10 min', free: false },
          { title: 'Web Font Implementation', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Layout and Grid Systems',
        lessons: [
          { title: 'Grid Fundamentals', duration: '16 min', free: false },
          { title: 'Creating Layouts with Grids', duration: '18 min', free: false },
          { title: 'Flexbox Layouts', duration: '20 min', free: false },
          { title: 'CSS Grid', duration: '22 min', free: false },
          { title: 'Responsive Grid Systems', duration: '18 min', free: false }
        ]
      },
      {
        section: 'Responsive Design',
        lessons: [
          { title: 'Mobile-First Approach', duration: '14 min', free: false },
          { title: 'Breakpoints and Media Queries', duration: '16 min', free: false },
          { title: 'Flexible Images and Media', duration: '12 min', free: false },
          { title: 'Touch-Friendly Design', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Design Tools',
        lessons: [
          { title: 'Introduction to Figma', duration: '20 min', free: false },
          { title: 'Creating Wireframes', duration: '18 min', free: false },
          { title: 'Building Prototypes', duration: '22 min', free: false },
          { title: 'Design Handoff', duration: '14 min', free: false }
        ]
      },
      {
        section: 'UX/UI Best Practices',
        lessons: [
          { title: 'User Research Basics', duration: '16 min', free: false },
          { title: 'Creating User Personas', duration: '14 min', free: false },
          { title: 'Navigation Design', duration: '18 min', free: false },
          { title: 'Call-to-Action Design', duration: '12 min', free: false },
          { title: 'Form Design Best Practices', duration: '16 min', free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Ama Owusu',
        rating: 5,
        date: '2 weeks ago',
        title: 'Perfect for aspiring designers',
        text: 'This course taught me the principles of good design. I went from thinking design was just about pretty colors to understanding the real purpose behind every design decision.'
      },
      {
        id: 2,
        author: 'Kwesi Mensah',
        rating: 5,
        date: '3 weeks ago',
        title: 'Fundamentals made easy',
        text: 'Great introduction to web design. The color theory and typography sections were eye-opening. Now I can design websites that actually convert!'
      },
      {
        id: 3,
        author: 'Zainab Mohammed',
        rating: 5,
        date: '1 month ago',
        title: 'Started my design journey here',
        text: 'I was lost when I started but this course gave me a solid foundation. Waliu explains why things work, not just how to do them.'
      },
      {
        id: 4,
        author: 'David Boateng',
        rating: 4,
        date: '6 weeks ago',
        title: 'Comprehensive but wanting more projects',
        text: 'Good foundation course. The design principles are explained well. Would love more hands-on design projects to practice.'
      },
      {
        id: 5,
        author: 'Akosua Anane',
        rating: 5,
        date: '2 months ago',
        title: 'Changed how I approach design',
        text: 'After this course, my client websites look more professional and perform better. Great value at this price!'
      },
      {
        id: 6,
        author: 'Samuel Oppong',
        rating: 5,
        date: '2 months ago',
        title: 'Essential for web professionals',
        text: 'Every web developer should take this course. Even developers benefit from understanding good design principles.'
      },
      {
        id: 7,
        author: 'Yaa Adu',
        rating: 5,
        date: '3 months ago',
        title: 'Worth the investment',
        text: 'Affordable course with valuable content. The design principles I learned are timeless and have helped me create better designs.'
      },
      {
        id: 8,
        author: 'Comfort Addo',
        rating: 5,
        date: '4 months ago',
        title: 'Practical and inspiring',
        text: 'Loved learning about color psychology and typography. Makes me think differently about every design I see now.'
      },
      {
        id: 9,
        author: 'Kwame Asante',
        rating: 5,
        date: '4 months ago',
        title: 'Perfect starting point',
        text: 'I had zero design background and now I feel confident creating beautiful websites. Great course structure!'
      },
      {
        id: 10,
        author: 'Ekua Appiah',
        rating: 5,
        date: '5 months ago',
        title: 'Foundational knowledge that sticks',
        text: 'This is the kind of course you refer back to often. The fundamentals are taught in a way that really sticks.'
      },
      {
        id: 11,
        author: 'Nana Osei',
        rating: 4,
        date: '5 months ago',
        title: 'Solid foundation with good examples',
        text: 'Good foundational course. Could use more real-world case studies but the content is very solid.'
      },
      {
        id: 12,
        author: 'Abena Yeboah',
        rating: 5,
        date: '6 months ago',
        title: 'Made me fall in love with design',
        text: 'This course showed me design is not just making things look pretty - it is about solving problems. Changed my perspective!'
      }
    ]
  },
  {
    id: 4,
    slug: 'microsoft-excel-mastery',
    title: 'Microsoft Excel Mastery Course',
    subtitle: 'Learn Excel for business, data analysis, and productivity',
    description: `Become fluent in Microsoft Excel and use it to solve real business problems. This hands-on course walks you through formulas, functions, data cleaning, charts, PivotTables, dashboards, and automation basics. You'll learn how to structure data properly, analyze large datasets, and present insights clearly.

Perfect for business professionals, students, entrepreneurs, and anyone who wants to boost productivity with spreadsheets. No prior experience required—start from the fundamentals and build up to advanced, job-ready skills.`,
    thumbnail: '/courses/excel.webp',
    price: 250,
    originalPrice: 300,
    discount: 25,
    currency: 'GH₵',
    duration: '6 hours',
    level: 'Beginner to Intermediate',
    language: 'English',
    rating: 4.85,
    reviewCount: 0,
    studentCount: 2,
    lastUpdated: 'Jan 2026',
    modeOfStudies: ['Online Videos', 'Face to Face', 'Google Meet', 'Zoom', 'Teams'],
    instructor: {
      name: 'Waliu Aforlabi',
      title: 'Senior Web Developer',
      bio: 'Waliu is a senior web developer and data enthusiast with 4+ years of experience building responsive, user-friendly, and SEO-optimised solutions for businesses. He leverages Excel for business analysis, automation, and reporting, helping professionals work smarter with data-driven insights.',
      image: '/founder-waliu.png',
      rating: 5.0,
      students: 2,
      courses: 4
    },
    whatYouLearn: [
      'Build clean, well-structured spreadsheets for business tasks',
      'Use essential formulas (SUM, AVERAGE, IF, VLOOKUP, XLOOKUP, INDEX/MATCH)',
      'Clean and validate data quickly with Flash Fill, Remove Duplicates, and Data Validation',
      'Analyze data with PivotTables, PivotCharts, and slicers',
      'Create dashboards with charts, KPIs, and conditional formatting',
      'Use Tables, named ranges, and structured references for reliable models',
      'Automate repetitive tasks with basic Macros and productivity shortcuts',
      'Export, share, and protect workbooks for teams and clients'
    ],
    requirements: [
      'A computer with Microsoft Excel installed (Office 2019/2021/365 recommended)',
      'Basic computer skills (open files, type text)',
      'Willingness to practice with provided datasets'
    ],
    includes: [
      '6 hours on-demand video',
      '1 Year course access',
      'Certificate of completion',
      'Downloadable practice files',
      'Community support'
    ],
    curriculum: [
      {
        section: 'Excel Foundations',
        lessons: [
          { title: 'Tour of the Excel Interface', duration: '8 min', free: true },
          { title: 'Workbook, Worksheets, and Views', duration: '10 min', free: true },
          { title: 'Saving, Templates, and Versions', duration: '8 min', free: false },
          { title: 'Entering and Formatting Data', duration: '12 min', free: false },
          { title: 'Keyboard Shortcuts for Speed', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Formulas and Functions',
        lessons: [
          { title: 'Absolute vs Relative References', duration: '10 min', free: false },
          { title: 'Common Functions: SUM, AVERAGE, MIN, MAX', duration: '12 min', free: false },
          { title: 'Logical Functions: IF, AND, OR, IFS', duration: '14 min', free: false },
          { title: 'Lookup Functions: VLOOKUP, XLOOKUP, INDEX/MATCH', duration: '16 min', free: false },
          { title: 'Text Functions: LEFT, RIGHT, MID, TRIM, CONCAT', duration: '12 min', free: false },
          { title: 'Date Functions: TODAY, NETWORKDAYS, EOMONTH', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Data Cleaning and Validation',
        lessons: [
          { title: 'Using Tables and Structured References', duration: '12 min', free: false },
          { title: 'Remove Duplicates and Data Validation Rules', duration: '14 min', free: false },
          { title: 'Flash Fill and Text to Columns', duration: '12 min', free: false },
          { title: 'Sorting and Advanced Filtering', duration: '12 min', free: false },
          { title: 'Conditional Formatting for Data Quality', duration: '12 min', free: false }
        ]
      },
      {
        section: 'Data Analysis with PivotTables',
        lessons: [
          { title: 'Creating Your First PivotTable', duration: '12 min', free: false },
          { title: 'Grouping, Sorting, and Filtering Pivots', duration: '12 min', free: false },
          { title: 'Calculated Fields and Value Settings', duration: '14 min', free: false },
          { title: 'PivotCharts and Slicers', duration: '12 min', free: false },
          { title: 'Multi-sheet and Data Model Pivots', duration: '14 min', free: false }
        ]
      },
      {
        section: 'Visualization and Dashboards',
        lessons: [
          { title: 'Chart Types and When to Use Them', duration: '12 min', free: false },
          { title: 'Building KPI Cards with Conditional Formatting', duration: '12 min', free: false },
          { title: 'Dynamic Charts with Tables and Names', duration: '12 min', free: false },
          { title: 'Dashboard Layout and Design Tips', duration: '10 min', free: false },
          { title: 'Exporting and Sharing Dashboards', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Productivity and Automation',
        lessons: [
          { title: 'Time-saving Shortcuts and Quick Analysis', duration: '10 min', free: false },
          { title: 'Named Ranges and Dynamic Arrays (UNIQUE, FILTER)', duration: '12 min', free: false },
          { title: 'Intro to Macros: Recording and Running', duration: '12 min', free: false },
          { title: 'Protecting Sheets and Workbooks', duration: '10 min', free: false },
          { title: 'Printing, PDF Export, and Page Setup', duration: '10 min', free: false }
        ]
      },
      {
        section: 'Business Scenarios and Projects',
        lessons: [
          { title: 'Sales Reporting Workbook', duration: '14 min', free: false },
          { title: 'Expense Tracker with Dashboards', duration: '14 min', free: false },
          { title: 'HR Leave Tracker with Data Validation', duration: '12 min', free: false },
          { title: 'Budget vs Actuals Analysis', duration: '12 min', free: false },
          { title: 'Cleaning a Messy CSV for Reporting', duration: '14 min', free: false }
        ]
      }
    ],
    reviews: [
      { id: 1, author: 'Ama Owusu', rating: 5, date: '2 weeks ago', title: 'Excel finally makes sense', text: 'The instructor explains formulas in plain language. I used VLOOKUP and PivotTables at work the same day.' },
      { id: 2, author: 'Kwesi Mensah', rating: 5, date: '3 weeks ago', title: 'Great for business users', text: 'Exactly what I needed for my sales reports. The dashboard section is gold.' },
      { id: 3, author: 'Zainab Mohammed', rating: 5, date: '1 month ago', title: 'From basic to confident', text: 'I was scared of Excel before. Now I build reports and clean data quickly.' },
      { id: 4, author: 'David Boateng', rating: 4, date: '6 weeks ago', title: 'Practical examples', text: 'Loved the business scenarios. Would enjoy even more advanced Power Query, but still excellent.' },
      { id: 5, author: 'Akosua Anane', rating: 5, date: '2 months ago', title: 'Super helpful shortcuts', text: 'Shortcuts and templates saved me hours. Highly recommend for office work.' },
      { id: 6, author: 'Samuel Oppong', rating: 5, date: '2 months ago', title: 'Dashboard skills unlocked', text: 'Learned to build dashboards that my manager loves. Clear and concise lessons.' },
      { id: 7, author: 'Yaa Adu', rating: 5, date: '3 months ago', title: 'Worth every cedi', text: 'Affordable and straight to the point. I finally understand PivotTables.' },
      { id: 8, author: 'Comfort Addo', rating: 4, date: '4 months ago', title: 'Beginner friendly', text: 'Great pacing for beginners. A section on Power Query would make it perfect.' },
      { id: 9, author: 'Kwame Asante', rating: 5, date: '4 months ago', title: 'Job-ready skills', text: 'Helped me prepare for an analyst interview. The practice files are very useful.' },
      { id: 10, author: 'Ekua Appiah', rating: 5, date: '5 months ago', title: 'Clear and practical', text: 'Every lesson has a real-world use case. I use the templates daily.' },
      { id: 11, author: 'Nana Osei', rating: 5, date: '5 months ago', title: 'Confidence booster', text: 'I can now automate tasks with macros and save my team time. Fantastic course.' }
    ]
  }
];

export const getCourseBySlug = (slug) => {
  return courses.find(course => course.slug === slug);
};

export const getAllCourseSlugs = () => {
  return courses.map(course => course.slug);
};
