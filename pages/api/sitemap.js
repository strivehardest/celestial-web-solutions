import { blogArticles } from '../blog.js';
import projects from '../../data/projects.js';
import { courses } from '../../data/courses.js';
import { client } from '../../lib/sanity.js';

const BASE_URL = 'https://www.celestialwebsolutions.net';
const TODAY = new Date().toISOString().split('T')[0];

function getDate(dateString) {
  if (!dateString) return TODAY;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return TODAY;
    return date.toISOString().split('T')[0];
  } catch {
    return TODAY;
  }
}

const staticPaths = [
  // Core pages
  { path: '/',                                                                        priority: 1.0, changefreq: 'daily'   },
  { path: '/about',                                                                   priority: 0.7, changefreq: 'monthly' },
  { path: '/portfolio',                                                               priority: 0.8, changefreq: 'weekly'  },
  { path: '/contact',                                                                 priority: 0.6, changefreq: 'monthly' },
  { path: '/pricing',                                                                 priority: 0.7, changefreq: 'monthly' },
  { path: '/blog',                                                                    priority: 0.8, changefreq: 'daily'   },
  { path: '/courses',                                                                 priority: 0.8, changefreq: 'weekly'  },
  { path: '/faqs',                                                                    priority: 0.5, changefreq: 'monthly' },
  { path: '/schedule-a-call',                                                         priority: 0.6, changefreq: 'monthly' },
  { path: '/payment',                                                                 priority: 0.4, changefreq: 'monthly' },
  { path: '/privacy',                                                                 priority: 0.3, changefreq: 'yearly'  },
  { path: '/terms',                                                                   priority: 0.3, changefreq: 'yearly'  },

  // High-priority landing pages
  { path: '/web-design-company-in-ghana',                                             priority: 0.9, changefreq: 'monthly' },
  { path: '/best-web-designer-in-accra',                                              priority: 0.9, changefreq: 'monthly' },

  // Service pages
  { path: '/web-design-company-in-ghana/web-design-in-ghana',                        priority: 0.9, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/web-development-company-in-ghana',           priority: 0.9, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/ecommerce-website-development-ghana',        priority: 0.9, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/seo-services-in-ghana',                      priority: 0.8, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/ux-ui-design-in-ghana',                      priority: 0.8, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/it-support-in-ghana',                        priority: 0.8, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/google-ads-management-in-ghana',             priority: 0.7, changefreq: 'monthly' },
  { path: '/web-design-company-in-ghana/google-adsense-management-in-ghana',         priority: 0.7, changefreq: 'monthly' },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // ── Static URLs ──
  const staticUrls = staticPaths.map(({ path, priority, changefreq }) => ({
    loc: `${BASE_URL}${path}`,
    lastmod: TODAY,
    priority,
    changefreq,
  }));

  // ── Sanity blog posts (new posts written in Studio) ──
  let sanityBlogUrls = [];
  try {
    const sanityPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt
      }
    `);
    sanityBlogUrls = sanityPosts
      .filter(p => p.slug)
      .map(p => ({
        loc: `${BASE_URL}/blog/${p.slug}`,
        lastmod: getDate(p.publishedAt),
        priority: 0.8,
        changefreq: 'weekly',
      }));
  } catch (e) {
    console.error('Sitemap: Sanity fetch failed, continuing without Sanity posts:', e);
  }

  // ── Hardcoded blog posts (existing posts) ──
  // Deduplicate — if a slug exists in Sanity, skip the hardcoded version
  const sanitySlugSet = new Set(sanityBlogUrls.map(u => u.loc));

  const hardcodedBlogUrls = blogArticles
    .filter(post => !sanitySlugSet.has(`${BASE_URL}/blog/${post.slug}`))
    .map(post => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: getDate(post.date),
      priority: 0.8,
      changefreq: 'weekly',
    }));

  // Sanity posts first (newest), then remaining hardcoded
  const allBlogUrls = [...sanityBlogUrls, ...hardcodedBlogUrls];

  // ── Portfolio projects ──
  const portfolioUrls = projects.map(project => ({
    loc: `${BASE_URL}/portfolio/${project.slug}`,
    lastmod: getDate(
      project.completionDate && project.completionDate !== 'In Progress'
        ? project.completionDate
        : project.startDate
    ),
    priority: 0.7,
    changefreq: 'monthly',
  }));

  // ── Courses ──
  const courseUrls = courses.map(course => ({
    loc: `${BASE_URL}/courses/${course.slug}`,
    lastmod: getDate(course.lastUpdated),
    priority: 0.8,
    changefreq: 'weekly',
  }));

  // ── Combine all ──
  const allUrls = [
    ...staticUrls,
    ...allBlogUrls,
    ...portfolioUrls,
    ...courseUrls,
  ];

  // ── Generate XML ──
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(({ loc, lastmod, priority, changefreq }) => {
      let entry = `  <url>`;
      entry += `\n    <loc>${loc}</loc>`;
      if (lastmod) entry += `\n    <lastmod>${lastmod}</lastmod>`;
      entry += `\n    <changefreq>${changefreq}</changefreq>`;
      entry += `\n    <priority>${priority.toFixed(1)}</priority>`;
      entry += `\n  </url>`;
      return entry;
    })
    .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.write(sitemap);
  res.end();
}