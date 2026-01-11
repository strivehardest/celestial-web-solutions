import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to font origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        
        {/* Bricolage Grotesque – load immediately to avoid missing headings */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Google Sans with font-display swap and async loading */}
        <link 
          href="https://fonts.cdnfonts.com/css/google-sans?display=swap" 
          rel="stylesheet" 
          media="print"
          onLoad="this.media='all'"
        />
        
        {/* Fallback for no-JS */}
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
          <link href="https://fonts.cdnfonts.com/css/google-sans?display=swap" rel="stylesheet" />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
