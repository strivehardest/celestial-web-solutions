import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-6987345868426841" />
        {/* PWA manifest and theme color */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Preconnect to font origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Bricolage Grotesque – load immediately to avoid missing headings */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* JetBrains Mono for clock display */}
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Google Sans with font-display swap and async loading */}
        <link 
          href="https://fonts.cdnfonts.com/css/google-sans?display=swap" 
          rel="stylesheet" 
          media="print"
          onLoad="this.media='all'"
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6987345868426841"
          crossOrigin="anonymous"
        ></script>
        
        {/* Fallback for no-JS */}
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
          <link href="https://fonts.cdnfonts.com/css/google-sans?display=swap" rel="stylesheet" />
        </noscript>
            {/* Calendly Widget Script for Schedule a Call page */}
            <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
            {/* Cloudflare Turnstile CAPTCHA */}
            <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
            {/* DMCA Badge Helper — deferred for performance */}
            <script defer src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
