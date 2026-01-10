import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import MouseTrail from '../components/MouseTrail';
import ScrollToTop from '../components/ScrollToTop';
import SpinningLogoLoader from '../components/SpinningLogoLoader';

// Replace with your actual Google Analytics ID
const GA_TRACKING_ID = 'G-73D6Q2P389';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      setIsLoading(false);
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);

  return (
    <>
      {/* Show loader during page transitions */}
      {isLoading && <SpinningLogoLoader />}

      {/* Show loader during page transitions */}
      {isLoading && <SpinningLogoLoader />}

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      
      <Navbar />
      <CustomCursor />
      <MouseTrail />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;