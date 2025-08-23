import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import projects from "../data/projects";



export default function Portfolio() {
  // SEO Meta Tags and Structured Data
  useEffect(() => {
    // Update page title and meta description
    document.title = "Our Portfolio | Celestial Web Solutions - Web Development & Design Projects";
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore our portfolio of successful web development, design, and digital marketing projects. See how Celestial Web Solutions transforms businesses with innovative digital solutions.";

    // Create or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "web development portfolio, website design projects, best web developer in Ghana, best web designer in Ghana, digital marketing success stories, responsive web design, e-commerce solutions, Ghana web developer";

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Portfolio | Best Web Developer in Ghana - Celestial Web Solutions' },
      { property: 'og:description', content: 'View our portfolio of successful web development, design, and digital marketing projects that drive business growth.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Celestial Web Solutions' }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.setAttribute('property', tag.property);
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Portfolio | Best Web Developer in Ghana - Celestial Web Solutions' },
      { name: 'twitter:description', content: 'View our portfolio of successful web development and design projects.' }
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.name = tag.name;
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // Add structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Portfolio - Celestial Web Solutions",
      "description": "Portfolio showcasing web development, design, and digital marketing projects",
      "url": window.location.href,
      "mainEntity": {
        "@type": "ItemList",
        "name": "Web Development Portfolio",
        "description": "Collection of successful web development and design projects",
        "numberOfItems": projects?.length || 0,
        "itemListElement": projects?.map((project, index) => ({
          "@type": "CreativeWork",
          "position": index + 1,
          "name": project.title,
          "description": project.description,
          "image": project.image,
          "url": `${window.location.origin}/portfolio/${project.slug}`,
          "creator": {
            "@type": "Organization",
            "name": "Celestial Web Solutions"
          }
        })) || []
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": window.location.href
          }
        ]
      }
    };

    let structuredDataScript = document.querySelector('#portfolio-structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'portfolio-structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      const script = document.querySelector('#portfolio-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-32 pb-20">
        <section className="max-w-5xl mx-auto px-6">
      <h1 
        className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
      >
        Our Works
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link key={index} href={`/portfolio/${project.slug}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer hover:shadow-2xl group">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h2 
                  className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  {project.title}
                </h2>
                <p 
                  className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  {project.description}
                </p>
                <div 
                  className="mt-4 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-semibold transition-colors duration-200"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  View Project →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
        </section>
      </div>
    </div>
  );
}