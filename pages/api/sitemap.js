import { blogArticles } from '../blog.js';
import projects from '../../data/projects.js';
import { courses } from '../../data/courses.js';

const BASE_URL = 'https://celestialwebsolutions.net';

function getDate(dateString) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // Static URLs (no lastmod - we can't accurately track when these change)
  const staticPaths = [
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

  // Static URLs without lastmod
  const staticUrls = staticPaths.map(path => ({
    loc: `${BASE_URL}${path}`,
    lastmod: null,
  }));

  // Blog posts (from blog.js) - with accurate lastmod
  const blogUrls = blogArticles.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: getDate(post.date),
  }));

  // Portfolio projects - with accurate lastmod
  const portfolioUrls = projects.map(project => ({
    loc: `${BASE_URL}/portfolio/${project.slug}`,
    lastmod: getDate(project.completionDate && project.completionDate !== 'In Progress' ? project.completionDate : project.startDate),
  }));

  // Courses - with accurate lastmod
  const courseUrls = courses.map(course => ({
    loc: `${BASE_URL}/courses/${course.slug}`,
    lastmod: getDate(course.lastUpdated),
  }));

  // Combine all URLs
  const allUrls = [...staticUrls, ...blogUrls, ...portfolioUrls, ...courseUrls];

  // Generate sitemap XML - only include lastmod if it exists
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(({ loc, lastmod }) => {
      let entry = `  <url>\n    <loc>${loc}</loc>`;
      if (lastmod) {
        entry += `\n    <lastmod>${lastmod}</lastmod>`;
      }
      entry += `\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      return entry;
    })
    .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
