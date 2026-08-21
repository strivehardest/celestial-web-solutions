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
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import projects from '../data/projects';

const footerLink =
  'block text-[14px] leading-6 text-white/70 transition-colors hover:text-white';

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
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3"
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
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
              {city}, {country}
            </p>
            <p className="mt-0.5 font-mono text-[18px] font-semibold tabular-nums tracking-tight text-white">
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
    <footer className="bg-[#111111] text-white">
      {/* Contact + socials band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
              How can we help?{' '}
              <Link
                href="/contact"
                className="underline decoration-[#c8f542] decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80"
              >
                Contact us.
              </Link>
            </p>
            <p className="mt-2 max-w-md text-[14px] text-white/55">
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/web-design-company-in-ghana/web-development-company-in-ghana"
                  className={footerLink}
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/web-design-company-in-ghana/web-design-in-ghana" className={footerLink}>
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="/web-design-company-in-ghana/ecommerce-website-development-ghana"
                  className={footerLink}
                >
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link href="/web-design-company-in-ghana/seo-services-in-ghana" className={footerLink}>
                  SEO
                </Link>
              </li>
              <li>
                <Link href="/web-design-company-in-ghana/ux-ui-design-in-ghana" className={footerLink}>
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={footerLink}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className={footerLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={footerLink}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className={footerLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/courses" className={footerLink}>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/payment" className={footerLink}>
                  Make Payment
                </Link>
              </li>
              <li>
                <Link href="/schedule-a-call" className={footerLink}>
                  Schedule a Call
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/faqs" className={footerLink}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLink}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/best-web-designer-in-accra" className={footerLink}>
                  Best in Accra
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
                Portfolio
              </h3>
              <Link
                href="/portfolio"
                className="text-[12px] font-medium text-[#ff7a1a] transition-opacity hover:opacity-80"
              >
                View all →
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug} className="min-w-0">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className={`${footerLink} truncate`}
                    title={project.title}
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
              Get in touch
            </h3>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li className="flex items-start gap-2.5">
                <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <div className="space-y-0.5">
                  <a href="tel:+233599211746" className="block transition-colors hover:text-white">
                    +233 59 921 1746
                  </a>
                  <a href="tel:+233530517782" className="block transition-colors hover:text-white">
                    +233 53 051 7782
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a1a]" />
                <a
                  href="mailto:info@celestialwebsolutions.net"
                  className="break-all transition-colors hover:text-white"
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
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/25 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>
              <Link
                href="/schedule-a-call"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#ff7a1a] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>

        {/* Live time */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
            Our local time
          </h3>
          <LiveClocks />
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid gap-6 border-t border-white/10 pt-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <a
            href="https://techbehemoths.com/company/celestial-web-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 justify-center transition-opacity hover:opacity-80 lg:justify-start"
            title="Trusted and Verified by TechBehemoths"
          >
            <Image
              src="/images/TB-Trusted-on-black.svg"
              alt="Trusted and Verified by TechBehemoths"
              width={200}
              height={60}
            />
          </a>
          <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
            <iframe
              src="/designrush-widget-dark.html"
              title="DesignRush Reviews"
              scrolling="no"
              frameBorder="0"
              className="w-full"
              style={{ height: '120px', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Legal bar — leave room on mobile for fixed chat button */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 pb-28 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pb-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/55">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Notice
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
            <span>© {year} Celestial Web Solutions. All rights reserved.</span>
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
    </footer>
  );
}
