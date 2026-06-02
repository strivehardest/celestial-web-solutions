// scripts/submitIndexNow.js
const key = "485381d08fe442928caf9239a8db765a";
const host = "celestialwebsolutions.net";

const urls = [
  // ── Core Pages ───────────────────────────────────────────────
  "https://celestialwebsolutions.net/",
  "https://celestialwebsolutions.net/about",
  "https://celestialwebsolutions.net/services",
  "https://celestialwebsolutions.net/portfolio",
  "https://celestialwebsolutions.net/pricing",
  "https://celestialwebsolutions.net/blog",
  "https://celestialwebsolutions.net/courses",
  "https://celestialwebsolutions.net/faqs",
  "https://celestialwebsolutions.net/contact",
  "https://celestialwebsolutions.net/schedule-a-call",
  "https://celestialwebsolutions.net/payment",
  "https://celestialwebsolutions.net/privacy",
  "https://celestialwebsolutions.net/terms",

  // ── SEO Landing Pages ────────────────────────────────────────
  "https://celestialwebsolutions.net/web-design-company-in-ghana",
  "https://celestialwebsolutions.net/best-web-designer-in-accra",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/web-design-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/web-development-company-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/ecommerce-website-development-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/seo-services-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/ux-ui-design-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/it-support-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/google-ads-management-in-ghana",
  "https://celestialwebsolutions.net/web-design-company-in-ghana/google-adsense-management-in-ghana",

  // ── Blog Posts ───────────────────────────────────────────────
  "https://celestialwebsolutions.net/blog/best-web-design-companies-in-ghana-2026",
  "https://celestialwebsolutions.net/blog/ai-tools-web-development-2026",
  "https://celestialwebsolutions.net/blog/how-to-choose-best-web-design-company-ghana-2026",
  "https://celestialwebsolutions.net/blog/web-design-trends-ghana-world-2026",
  "https://celestialwebsolutions.net/blog/future-ready-website-ghana-international-2026",
  "https://celestialwebsolutions.net/blog/best-web-designers-in-accra-ghana-2025",
  "https://celestialwebsolutions.net/blog/content-marketing-strategies-ghana-2025",
  "https://celestialwebsolutions.net/blog/latest-web-development-tools-frameworks-2025",
  "https://celestialwebsolutions.net/blog/web-design-prices-ghana-2025-complete-guide",
  "https://celestialwebsolutions.net/blog/why-every-business-needs-website-ghana",
  "https://celestialwebsolutions.net/blog/seo-strategies-ghana-businesses-2025",
  "https://celestialwebsolutions.net/blog/mobile-money-integration-ghana-websites",
  "https://celestialwebsolutions.net/blog/responsive-web-design-best-practices-2025",
  "https://celestialwebsolutions.net/blog/chatgpt-ai-impact-web-development",
  "https://celestialwebsolutions.net/blog/website-security-tips-ghana-businesses",
  "https://celestialwebsolutions.net/blog/e-commerce-trends-ghana-2025",
  "https://celestialwebsolutions.net/blog/google-ads-vs-seo-ghana-businesses",
  "https://celestialwebsolutions.net/blog/how-to-start-online-store-ghana",
  "https://celestialwebsolutions.net/blog/wordpress-vs-custom-website-ghana-2026",
  "https://celestialwebsolutions.net/blog/ui-ux-design-principles-ghana-websites-2026",
  "https://celestialwebsolutions.net/blog/complete-guide-to-web-design-agencies-ghana",
  "https://celestialwebsolutions.net/blog/ultimate-guide-to-digital-marketing-ghana-2025",

  // ── Portfolio ────────────────────────────────────────────────
  "https://celestialwebsolutions.net/portfolio/tru-seeds-africa",
  "https://celestialwebsolutions.net/portfolio/myspace-furniture",
  "https://celestialwebsolutions.net/portfolio/building-planner-designs",
  "https://celestialwebsolutions.net/portfolio/dl-auto-parts",
  "https://celestialwebsolutions.net/portfolio/ghana-updates-online",
  "https://celestialwebsolutions.net/portfolio/adbay-store",
  "https://celestialwebsolutions.net/portfolio/elolo-agbleke-website",
  "https://celestialwebsolutions.net/portfolio/doeman-group",
  "https://celestialwebsolutions.net/portfolio/valyd-homes",
  "https://celestialwebsolutions.net/portfolio/celestial-shopping",
  "https://celestialwebsolutions.net/portfolio/finance-tracker",
  "https://celestialwebsolutions.net/portfolio/personal-portfolio-website",
  "https://celestialwebsolutions.net/portfolio/celestial-web-solutions",

  // ── Courses ──────────────────────────────────────────────────
  "https://celestialwebsolutions.net/courses/learn-wordpress-course",
  "https://celestialwebsolutions.net/courses/nextjs-complete-guide",
  "https://celestialwebsolutions.net/courses/web-design-fundamentals",
  "https://celestialwebsolutions.net/courses/microsoft-excel-mastery",
];

async function submit() {
  console.log(`\nSubmitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });

  console.log(`\nIndexNow Submission Report`);
  console.log(`──────────────────────────`);
  console.log(`Total URLs: ${urls.length}`);
  console.log(`HTTP Status: ${res.status}`);

  if (res.status === 200) {
    console.log(`✅ All ${urls.length} URLs submitted successfully!`);
  } else if (res.status === 202) {
    console.log(`✅ All ${urls.length} URLs accepted and queued for processing!`);
  } else if (res.status === 403) {
    console.error("❌ Key not valid — confirm this file is live:");
    console.error(`   https://${host}/${key}.txt`);
  } else if (res.status === 422) {
    console.error("❌ URLs don't match the host — check for typos.");
  } else if (res.status === 429) {
    console.error("⚠️ Too many requests — wait and try again.");
  } else {
    console.warn(`⚠️ Unexpected status: ${res.status}`);
  }
}

submit();