import { useEffect, useRef } from 'react';

export default function CalendlyWidget() {
  const ref = useRef(null);

  useEffect(() => {
    // Load Calendly script lazily
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (ref.current && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/waliuaforlabi?hide_landing_page_details=1&primary_color=f7a707',
          parentElement: ref.current,
          prefill: {},
          utm: {}
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={ref} style={{ minWidth: '320px', height: '700px' }} />
  );
}
