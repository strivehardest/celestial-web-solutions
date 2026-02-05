import { useEffect, useRef } from 'react';

let adCounter = 0;

export default function GoogleAd({ slot = "5430272990", format = "auto", responsive = true }) {
  const adRef = useRef(null);
  const adId = useRef(`ad-${Date.now()}-${++adCounter}`);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Reset on mount
    isAdPushed.current = false;

    const pushAd = () => {
      try {
        if (isAdPushed.current) return;
        
        if (adRef.current && window.adsbygoogle) {
          // Clear any existing content
          if (adRef.current.innerHTML === '') {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isAdPushed.current = true;
          }
        }
      } catch (e) {
        // AdSense error - likely ad blocker or already filled
        console.log('AdSense:', e.message);
      }
    };

    // Wait for adsbygoogle to be ready
    const checkAndPush = () => {
      if (window.adsbygoogle) {
        pushAd();
      } else {
        // Script not loaded yet, wait and retry
        setTimeout(checkAndPush, 500);
      }
    };

    // Delay initial push to ensure DOM is ready
    const timer = setTimeout(checkAndPush, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [slot]);

  return (
    <div key={adId.current} className="google-ad-container w-full overflow-hidden my-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
        data-ad-client="ca-pub-6987345868426841"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  );
}
