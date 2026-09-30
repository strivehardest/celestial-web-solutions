import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiSmartphone } from 'react-icons/fi';
import { getFeaturedProjects } from '../data/projects';
import ThemeToggle from './ThemeToggle';
import CtaArrow from './CtaArrow';

const footerLink =
  'block text-[14px] leading-6 text-gray-600 transition-colors hover:text-gray-950 dark:text-white/70 dark:hover:text-white';

const footerHeading =
  'mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-950 dark:text-white';

const footerMoreLink =
  'mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#ff7a1a] transition-opacity hover:opacity-80';

const SERVICE_LINKS = [
  { label: 'Web Development', href: '/web-design-company-in-ghana/web-development-company-in-ghana' },
  { label: 'Web Design', href: '/web-design-company-in-ghana/web-design-in-ghana' },
  { label: 'App Development', href: '/web-design-company-in-ghana/app-development-in-ghana' },
  { label: 'E-Commerce', href: '/web-design-company-in-ghana/ecommerce-website-development-ghana' },
  { label: 'SEO', href: '/web-design-company-in-ghana/seo-services-in-ghana' },
  { label: 'UX/UI Design', href: '/web-design-company-in-ghana/ux-ui-design-in-ghana' },
  { label: 'Google Ads', href: '/web-design-company-in-ghana/google-ads-management-in-ghana' },
  { label: 'Google AdSense', href: '/web-design-company-in-ghana/google-adsense-management-in-ghana' },
  { label: 'IT Support', href: '/web-design-company-in-ghana/it-support-in-ghana' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Best in Accra', href: '/best-web-designer-in-accra' },
  { label: 'Request a Service', href: '/request-a-service' },
  { label: 'Make Payment', href: '/payment' },
];

const RESOURCE_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Courses', href: '/courses' },
  { label: 'Celestial AI', href: '/celestial-ai' },
  { label: 'FAQs', href: '/faqs' },
];

const featuredProjects = getFeaturedProjects(8);

function LinkColumn({ title, links, className = '', children }) {
  return (
    <div className={className}>
      <h3 className={footerHeading}>{title}</h3>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={footerLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

const whatsappLink =
  'https://wa.me/233530505031?text=' +
  encodeURIComponent("Hi Celestial, I'm interested in your web development services.");

const socialLinks = [
  { href: 'https://x.com/strivehardest', label: 'X (Twitter)', Icon: FaTwitter },
  { href: whatsappLink, label: 'WhatsApp', Icon: FaWhatsapp },
  { href: 'https://facebook.com/celestialwebsolutions', label: 'Facebook', Icon: FaFacebook },
  { href: 'https://instagram.com/celestialwebsolutions', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://linkedin.com/in/aforlabi', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'https://youtube.com/@celestialwebsolutions', label: 'YouTube', Icon: FaYoutube },
];

const TIME_ZONES = [
  { city: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', flagCode: 'gh' },
  { city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', flagCode: 'ng' },
  { city: 'New York', country: 'USA', timezone: 'America/New_York', flagCode: 'us' },
  { city: 'London', country: 'UK', timezone: 'Europe/London', flagCode: 'gb' },
];

function LiveClocks() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const tick = () => {
      const next = {};
      TIME_ZONES.forEach(({ city, timezone }) => {
        next[city] = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: timezone,
        }).format(new Date());
      });
      setTimes(next);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {TIME_ZONES.map(({ city, country, flagCode }) => (
        <div
          key={city}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <img
            src={`https://flagcdn.com/w40/${flagCode}.png`}
            srcSet={`https://flagcdn.com/w80/${flagCode}.png 2x`}
            width="28"
            height="21"
            alt=""
            className="rounded shadow-sm"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-white/45">
              {city}, {country}
            </p>
            <p className="mt-0.5 font-mono text-[18px] font-semibold tabular-nums tracking-tight text-gray-950 dark:text-white">
              {times[city] || '--:--:--'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-950 transition-colors duration-300 dark:bg-[#111111] dark:text-white">
      {/* Contact + socials band */}
      <div className="border-b border-gray-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-[34px]">
              How can we help?{' '}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-1.5 text-gray-950 underline decoration-orange-500 decoration-2 underline-offset-[6px] transition-colors duration-300 hover:text-orange-600 hover:decoration-orange-600 focus:text-orange-600 focus:decoration-orange-600 active:text-orange-600 active:decoration-orange-600 dark:text-white dark:decoration-[#c8f542] dark:hover:text-[#c8f542] dark:hover:decoration-white dark:focus:text-[#c8f542] dark:focus:decoration-white dark:active:text-[#c8f542] dark:active:decoration-white"
              >
                <span>Contact us.</span>
                <span
                  aria-hidden="true"
                  className="inline-flex translate-x-0 opacity-70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:opacity-100 group-focus:translate-x-1.5 group-focus:opacity-100 group-active:translate-x-1.5 group-active:opacity-100"
                >
                  →
                </span>
              </Link>
            </p>
            <p className="mt-2 max-w-md text-[14px] text-gray-500 dark:text-white/55">
              Tell us about your project — we usually reply within one business day.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 dark:border-white/15 dark:text-white/80 dark:hover:border-white/40 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6 lg:grid-cols-12 lg:gap-x-8">
          <LinkColumn title="Services" links={SERVICE_LINKS} className="md:col-span-2 lg:col-span-2">
            <Link href="/web-design-company-in-ghana" className={footerMoreLink}>
              All services <span aria-hidden="true">→</span>
            </Link>
          </LinkColumn>

          <LinkColumn title="Company" links={COMPANY_LINKS} className="md:col-span-2 lg:col-span-2" />

          <LinkColumn title="Resources" links={RESOURCE_LINKS} className="md:col-span-2 lg:col-span-2" />

          <div className="md:col-span-3 lg:col-span-3">
            <h3 className={footerHeading}>Portfolio</h3>
            <ul className="space-y-3">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="block text-[14px] leading-5 text-gray-600 transition-colors hover:text-gray-950 dark:text-white/70 dark:hover:text-white"
                  >
                    {project.shortTitle || project.title.trim()}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/portfolio" className={footerMoreLink}>
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <h3 className={footerHeading}>Get in touch</h3>
            <ul className="space-y-3 text-[14px] text-gray-600 dark:text-white/70">
              <li className="flex items-start gap-2.5">
                <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <div className="space-y-0.5">
                  <a
                    href="tel:+233245671832"
                    className="block transition-colors hover:text-gray-950 dark:hover:text-white"
                  >
                    +233 24 567 1832
                  </a>
                  <a
                    href="https://wa.me/233530505031"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-gray-950 dark:hover:text-white"
                  >
                    WhatsApp +233 53 050 5031
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <FiSmartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <Link href="/payment" className="transition-colors hover:text-gray-950 dark:hover:text-white">
                  Paystack USSD:{' '}
                  <span className="notranslate font-semibold text-gray-800 dark:text-white" translate="no">
                    *415*3370#
                  </span>
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <a
                  href="mailto:info@celestialwebsolutions.net"
                  className="break-all transition-colors hover:text-gray-950 dark:hover:text-white"
                >
                  info@celestialwebsolutions.net
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <span>Accra, Ghana · Remote worldwide</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/contact"
                className="group relative inline-flex h-10 items-center justify-center rounded-full border border-gray-900 px-5 text-[13px] font-semibold text-gray-950 transition-colors hover:bg-gray-950 hover:text-white dark:border-white/25 dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                <span className="relative z-10 inline-flex items-center">
                  Contact Us
                  <CtaArrow size={14} />
                </span>
              </Link>
              <Link
                href="/schedule-a-call"
                className="group relative inline-flex h-10 items-center justify-center rounded-full bg-[#ff7a1a] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <span className="relative z-10 inline-flex items-center">
                  Schedule a Call
                  <CtaArrow size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Live time */}
        <div className="mt-12 border-t border-gray-200 pt-10 dark:border-white/10">
          <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-950 dark:text-white">
            Our local time
          </h3>
          <LiveClocks />
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid gap-6 border-t border-gray-200 pt-10 dark:border-white/10 lg:grid-cols-[auto_1fr] lg:items-center">
          <a
            href="https://techbehemoths.com/company/celestial-web-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 justify-center transition-opacity hover:opacity-80 lg:justify-start"
            title="Trusted and Verified by TechBehemoths"
          >
            <Image
              src="/images/TB-Trusted-on-white.svg"
              alt="Trusted and Verified by TechBehemoths"
              width={200}
              height={60}
              className="block dark:hidden"
            />
            <Image
              src="/images/TB-Trusted-on-black.svg"
              alt="Trusted and Verified by TechBehemoths"
              width={200}
              height={60}
              className="hidden dark:block"
            />
          </a>
          <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-[#0a0a0a]">
            <iframe
              src="/designrush-widget.html"
              title="DesignRush Reviews"
              scrolling="no"
              frameBorder="0"
              className="block w-full dark:hidden"
              style={{ height: '120px', border: 'none' }}
            />
            <iframe
              src="/designrush-widget-dark.html"
              title="DesignRush Reviews"
              scrolling="no"
              frameBorder="0"
              className="hidden w-full dark:block"
              style={{ height: '120px', border: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Legal bar — leave room on mobile for fixed chat button */}
      <div className="border-t border-gray-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 pb-28 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8 lg:pb-8 lg:text-left">
          <div className="flex flex-col items-center gap-y-2 text-[13px] text-gray-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 dark:text-white/55 lg:items-center lg:justify-start">
            <Link href="/privacy" className="transition-colors hover:text-gray-950 dark:hover:text-white">
              Privacy Notice
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gray-950 dark:hover:text-white">
              Terms of Use
            </Link>
            <Link href="/contact" className="transition-colors hover:text-gray-950 dark:hover:text-white">
              Contact
            </Link>
            <span>© {year} Celestial Web Solutions. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-white/40">
                Theme
              </span>
              <ThemeToggle variant="footer" />
            </div>
            <a
              href="https://www.dmca.com/compliance/celestialwebsolutions.net"
              title="DMCA.com Protection Status"
              className="dmca-badge inline-flex opacity-80 transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://images.dmca.com/Badges/dmca_protected_sml_120a.png?ID=a2cdeca7-613e-4377-a477-855d263ffc77"
                alt="DMCA.com Protection Status"
                width="121"
                height="24"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
