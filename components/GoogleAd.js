import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    if (window) {
      const scriptId = 'adsbygoogle-js';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6987345868426841';
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
      // Push adsbygoogle after script loads
      const pushAds = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      };
      if (window.adsbygoogle) {
        pushAds();
      } else {
        script.onload = pushAds;
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-6987345868426841"
      data-ad-slot="5430272990"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
