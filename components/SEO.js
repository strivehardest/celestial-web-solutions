import Head from "next/head";

export default function SEO({
  title = "Celestial Web Solutions",
  description = "Professional web development, SEO, and digital solutions for businesses. Best web developer in Ghana. Best web designer in Ghana. Best Web Designer in Accra.",
  url = "https://celestialwebsolutions.net",
  image = "https://celestialwebsolutions.net/default-og-image.jpg",
  twitterHandle = "@strivehardest",
}) {
  const siteName = "Celestial Web Solutions";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url,
    logo: `${url}/logo.png`,
    sameAs: [
      "https://facebook.com/celestialwebsolutions",
      "https://twitter.com/strivehardest",
      "https://linkedin.com/in/aforlabi",
    ],
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Favicon and Theme */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </Head>
  );
}
