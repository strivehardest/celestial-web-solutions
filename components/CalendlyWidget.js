import { useEffect, useRef } from 'react';

export default function CalendlyWidget() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/waliuaforlabi?hide_landing_page_details=1&primary_color=f7a707',
        parentElement: ref.current,
        prefill: {},
        utm: {}
      });
    }
  }, []);

  return (
    <div ref={ref} style={{ minWidth: '320px', height: '700px' }} />
  );
}
