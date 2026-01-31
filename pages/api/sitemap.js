import { blogPosts } from '../../lib/blogData.js';
import projects from '../../data/projects.js';
import { courses } from '../../data/courses.js';

const BASE_URL = 'https://celestialwebsolutions.net';

function getDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0];
  return new Date(dateString).toISOString().split('T')[0];
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // Static URLs
  let urls = [
    '/',
    '/about',
    '/web-design-company-in-ghana',
    '/best-web-designer-in-accra',
    '/portfolio',
    '/contact',
    '/pricing',
    '/privacy',
    '/faqs',
    '/terms',
    '/schedule-a-call',
    '/payment',
    '/dashboard',
    '/courses',
    '/blog',
    // Service pages
    '/web-design-company-in-ghana/web-design-in-ghana',
    '/web-design-company-in-ghana/web-development-company-in-ghana',
    '/web-design-company-in-ghana/web-development-in-ghana',
    '/web-design-company-in-ghana/ux-ui-design-in-ghana',
    '/web-design-company-in-ghana/seo-services-in-ghana',
    '/web-design-company-in-ghana/it-support-in-ghana',
    '/web-design-company-in-ghana/google-adsense-management-in-ghana',
    '/web-design-company-in-ghana/google-ads-management-in-ghana',
    '/web-design-company-in-ghana/ecommerce-website-development-ghana',
  ];

  // Blog posts
  const blogUrls = blogPosts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: getDate(post.date),
  }));

  // Portfolio projects
  const portfolioUrls = projects.map(project => ({
    loc: `${BASE_URL}/portfolio/${project.slug}`,
    lastmod: getDate(project.completionDate && project.completionDate !== 'In Progress' ? project.completionDate : project.startDate),
  }));

  // Courses
  const courseUrls = courses.map(course => ({
    loc: `${BASE_URL}/courses/${course.slug}`,
    lastmod: getDate(course.lastUpdated),
  }));

  // Static URLs
  const staticUrls = urls.map(u => ({
    loc: `${BASE_URL}${u}`,
    lastmod: getDate(),
  }));

  // Combine all URLs
  const allUrls = [...staticUrls, ...blogUrls, ...portfolioUrls, ...courseUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
      ({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
    .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
