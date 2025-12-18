import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import MouseTrail from '../components/MouseTrail';
import ScrollToTop from '../components/ScrollToTop';

// Replace with your actual Google Analytics ID
const GA_TRACKING_ID = 'G-73D6Q2P389';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
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