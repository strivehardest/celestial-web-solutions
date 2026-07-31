import Link from 'next/link';
import {
  Code2,
  Monitor,
  ShoppingCart,
  Search,
  Palette,
  Headphones,
  Megaphone,
  CircleDollarSign,
} from 'lucide-react';

const SERVICES = [
  {
    title: 'Web Development',
    href: '/web-design-company-in-ghana/web-development-company-in-ghana',
    Icon: Code2,
  },
  {
    title: 'Web Design',
    href: '/web-design-company-in-ghana/web-design-in-ghana',
    Icon: Monitor,
  },
  {
    title: 'E-Commerce',
    href: '/web-design-company-in-ghana/ecommerce-website-development-ghana',
    Icon: ShoppingCart,
  },
  {
    title: 'SEO Optimization',
    href: '/web-design-company-in-ghana/seo-services-in-ghana',
    Icon: Search,
  },
  {
    title: 'UX/UI Design',
    href: '/web-design-company-in-ghana/ux-ui-design-in-ghana',
    Icon: Palette,
  },
  {
    title: 'IT Support',
    href: '/web-design-company-in-ghana/it-support-in-ghana',
    Icon: Headphones,
  },
  {
    title: 'Google Ads',
    href: '/web-design-company-in-ghana/google-ads-management-in-ghana',
    Icon: Megaphone,
  },
  {
    title: 'AdSense Management',
    href: '/web-design-company-in-ghana/google-adsense-management-in-ghana',
    Icon: CircleDollarSign,
  },
];

function ServiceItem({ service }) {
  const { title, href, Icon } = service;

  return (
    <Link href={href} className="cws-svc-item" aria-label={title}>
      <span className="cws-svc-icon" aria-hidden="true">
        <Icon size={26} strokeWidth={2} />
      </span>
      <span className="cws-svc-label">{title}</span>
      <span className="cws-svc-divider" aria-hidden="true" />
    </Link>
  );
}

export default function ServicesScrollStrip() {
  const loop = [...SERVICES, ...SERVICES];

  return (
    <section className="cws-svc-strip" aria-label="Our services">
      <div className="cws-svc-fade cws-svc-fade-left" aria-hidden="true" />
      <div className="cws-svc-fade cws-svc-fade-right" aria-hidden="true" />

      <div className="cws-svc-viewport">
        <div className="cws-svc-track">
          {loop.map((service, index) => (
            <ServiceItem
              key={`${service.title}-${index}`}
              service={service}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .cws-svc-strip {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        html.dark .cws-svc-strip {
          background: #111827;
          border-color: #1f2937;
        }

        .cws-svc-viewport {
          overflow: hidden;
          padding: 20px 0;
        }

        .cws-svc-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: cwsSvcScroll 40s linear infinite;
          will-change: transform;
        }

        .cws-svc-strip:hover .cws-svc-track {
          animation-play-state: paused;
        }

        .cws-svc-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0 32px;
          text-decoration: none;
          white-space: nowrap;
          color: #111827;
          transition: color 0.2s ease;
        }

        html.dark .cws-svc-item {
          color: #f9fafb;
        }

        .cws-svc-item:hover {
          color: #ea580c;
        }

        .cws-svc-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #f97316;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .cws-svc-item:hover .cws-svc-icon {
          color: #ea580c;
          transform: translateY(-1px);
        }

        .cws-svc-label {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .cws-svc-divider {
          width: 1px;
          height: 28px;
          margin-left: 18px;
          background: #e5e7eb;
          flex-shrink: 0;
        }

        html.dark .cws-svc-divider {
          background: #374151;
        }

        .cws-svc-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 72px;
          z-index: 2;
          pointer-events: none;
        }

        .cws-svc-fade-left {
          left: 0;
          background: linear-gradient(90deg, #ffffff 0%, transparent 100%);
        }

        .cws-svc-fade-right {
          right: 0;
          background: linear-gradient(270deg, #ffffff 0%, transparent 100%);
        }

        html.dark .cws-svc-fade-left {
          background: linear-gradient(90deg, #111827 0%, transparent 100%);
        }

        html.dark .cws-svc-fade-right {
          background: linear-gradient(270deg, #111827 0%, transparent 100%);
        }

        @keyframes cwsSvcScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .cws-svc-viewport { padding: 16px 0; }
          .cws-svc-track { animation-duration: 30s; }
          .cws-svc-item { padding: 0 20px; gap: 10px; }
          .cws-svc-label { font-size: 14px; }
          .cws-svc-divider { height: 22px; margin-left: 12px; }
          .cws-svc-fade { width: 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cws-svc-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
