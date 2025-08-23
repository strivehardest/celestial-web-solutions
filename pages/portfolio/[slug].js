import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import projects from "../../data/projects";

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const project = projects.find((p) => p.slug === slug);

  // SEO & Structured Data
  useEffect(() => {
    if (!project) return;

    // Page Title
    document.title = `${project.title} | Celestial Web Solutions - Project Details`;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = project.description;

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = `${project.title}, web development project, Celestial Web Solutions, responsive design, e-commerce`;

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: `${project.title} | Celestial Web Solutions` },
      { property: "og:description", content: project.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: window.location.href },
      { property: "og:image", content: project.image },
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!existingTag) {
        existingTag = document.createElement("meta");
        existingTag.setAttribute("property", tag.property);
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // Twitter Card Tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${project.title} | Celestial Web Solutions` },
      { name: "twitter:description", content: project.description },
      { name: "twitter:image", content: project.image },
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        existingTag = document.createElement("meta");
        existingTag.name = tag.name;
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": project.image,
      "url": window.location.href,
      "creator": {
        "@type": "Organization",
        "name": "Celestial Web Solutions"
      },
      "datePublished": project.date || "2025-01-01",
      "inLanguage": "en",
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
            "item": `${window.location.origin}/portfolio`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": window.location.href
          }
        ]
      }
    };

    let structuredDataScript = document.querySelector("#project-structured-data");
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.id = "project-structured-data";
      structuredDataScript.type = "application/ld+json";
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    return () => {
      const script = document.querySelector("#project-structured-data");
      if (script) script.remove();
    };
  }, [project]);

  if (!slug) return <p className="text-center mt-10">Loading project...</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 pt-32">
      {/* Back Link */}
      <Link href="/portfolio" className="text-orange-600 mb-4 block hover:text-orange-700 transition">
        ← Back to Portfolio
      </Link>

      {/* Project Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={500}
          className="object-cover w-full rounded-lg"
        />

        {/* Project Title with Gradient & Custom Font */}
        <h1
          className="text-4xl font-bold mt-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          {project.title}
        </h1>

        {/* Project Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-6">
          <h3
            className="font-semibold text-lg text-gray-900 dark:text-white"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Tech Stack:
          </h3>
          <ul className="flex flex-wrap gap-3 mt-3">
            {project.tech.map((t, i) => (
              <li
                key={i}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Visit Website Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          Visit Website →
        </a>
      </div>
    </section>
  );
}
