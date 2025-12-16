import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      {visible && (
        <button
          onClick={handleClick}
          aria-label="Scroll to top"
          className="fixed bottom-8 left-8 z-50 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg p-3 transition-all duration-300 flex items-center justify-center"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 22 }}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  );
}
