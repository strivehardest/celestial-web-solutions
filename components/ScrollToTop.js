import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

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
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setVisible(scrollY > 200);
      setProgress(percent);
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
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 22, width: 60, height: 60, position: 'fixed' }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: 'absolute' }}>
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.2"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            />
          </svg>
          <span style={{ position: 'relative', zIndex: 1 }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
