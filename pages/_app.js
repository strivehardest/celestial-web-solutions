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
import TalkToExpertModal from '../components/TalkToExpertModal';

const GA_TRACKING_ID = 'G-73D6Q2P389';
const TIKTOK_PIXEL_ID = 'D6E4AVRC77UAAN008960';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showExpertPopup, setShowExpertPopup] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      setIsLoading(false);
      // Google Analytics page view
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
      // TikTok page view
      if (window.ttq) {
        window.ttq.page();
      }
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

  // Auto-show Talk to Expert popup once per session after 5 seconds
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadyShown = sessionStorage.getItem('expertPopupShown');
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowExpertPopup(true);
      sessionStorage.setItem('expertPopupShown', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Show loader during page transitions — fixed duplicate */}
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

      {/* TikTok Pixel */}
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
              ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,
              ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");
              n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
              e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />

      <Navbar />
      <CustomCursor />
      <MouseTrail />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />

      {/* AdSense — lazyOnload means it loads after everything else */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6987345868426841"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      {/* Auto-popup: Talk to an Expert */}
      <TalkToExpertModal
        isOpen={showExpertPopup}
        onClose={() => setShowExpertPopup(false)}
      />
    </>
  );
}

export default MyApp;