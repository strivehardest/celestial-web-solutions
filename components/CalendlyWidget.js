import { useEffect, useRef } from 'react';

export default function CalendlyWidget() {
  const ref = useRef(null);

  useEffect(() => {
    const initCalendly = () => {
      if (ref.current && window.Calendly) {
        ref.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/waliuaforlabi?hide_landing_page_details=1&primary_color=f7a707',
          parentElement: ref.current,
          prefill: {},
          utm: {}
        });
      }
    };

    // If Calendly script is already available, initialize immediately.
    if (window.Calendly) {
      initCalendly();
      return;
    }

    let script = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    let onLoadHandler;

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    onLoadHandler = () => initCalendly();
    script.addEventListener('load', onLoadHandler);

    return () => {
      if (script && onLoadHandler) {
        script.removeEventListener('load', onLoadHandler);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ minWidth: '320px', height: '700px' }} />
  );
}
