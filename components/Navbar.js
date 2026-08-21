import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  CreditCard,
  DollarSign,
  FileText,
  GraduationCap,
  HelpCircle,
  Menu,
  Shield,
  X,
} from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import TalkToExpertModal from './TalkToExpertModal';
import LanguageSwitcher from './LanguageSwitcher';
import CtaArrow from './CtaArrow';

const SERVICES = [
  { name: 'Web Development', href: '/web-design-company-in-ghana/web-development-company-in-ghana' },
  { name: 'Web Design', href: '/web-design-company-in-ghana/web-design-in-ghana' },
  { name: 'E-Commerce', href: '/web-design-company-in-ghana/ecommerce-website-development-ghana' },
  { name: 'SEO Services', href: '/web-design-company-in-ghana/seo-services-in-ghana' },
  { name: 'UX/UI Design', href: '/web-design-company-in-ghana/ux-ui-design-in-ghana' },
  { name: 'IT Support', href: '/web-design-company-in-ghana/it-support-in-ghana' },
  { name: 'Google Ads', href: '/web-design-company-in-ghana/google-ads-management-in-ghana' },
  { name: 'Google AdSense', href: '/web-design-company-in-ghana/google-adsense-management-in-ghana' },
];

const RESOURCES = [
  { name: 'Blog', href: '/blog', description: 'Insights and tutorials', icon: 'blog' },
  { name: 'FAQs', href: '/faqs', description: 'Common questions answered', icon: 'faqs' },
  { name: 'Make Payment', href: '/payment', description: 'Secure online payments', icon: 'payment' },
  { name: 'Terms of Service', href: '/terms', description: 'Our terms and conditions', icon: 'terms' },
  { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data', icon: 'privacy' },
];

function DropdownIcon({ name }) {
  const className = 'w-4 h-4';
  switch (name) {
    case 'blog':
      return <BookOpen className={className} />;
    case 'pricing':
      return <DollarSign className={className} />;
    case 'faqs':
      return <HelpCircle className={className} />;
    case 'payment':
      return <CreditCard className={className} />;
    case 'terms':
      return <FileText className={className} />;
    case 'privacy':
      return <Shield className={className} />;
    default:
      return <FileText className={className} />;
  }
}

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setIsMenuOpen(false);
      setOpenMenu(null);
    };
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  const openDropdown = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const navLinkClass = (active) =>
    `inline-flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors ${
      active
        ? 'text-gray-950 dark:text-white'
        : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9990] bg-white transition-[background-color,box-shadow,border-color] duration-300 dark:bg-gray-950 ${
          scrolled
            ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)]'
            : 'border-b border-black/[0.06] dark:border-white/10'
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Celestial Web Solutions home">
            <Image
              src="/logo.png"
              alt="Celestial Web Solutions"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
            <span className="hidden sm:block leading-tight">
              <span
                className="block text-[17px] font-bold tracking-tight text-gray-950 dark:text-white"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Celestial
              </span>
              <span
                className="block text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Web Solutions
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className={navLinkClass(isActive('/'))} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => openDropdown('services')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={navLinkClass(isActive('/web-design-company-in-ghana'))}
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
                aria-expanded={openMenu === 'services'}
                onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
              >
                Services
                <ChevronDown size={14} className={`transition-transform ${openMenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openMenu === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-3 w-[320px] rounded-2xl border border-black/8 bg-white p-3 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/40"
                    onMouseEnter={() => openDropdown('services')}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="grid grid-cols-1 gap-0.5">
                      {SERVICES.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors dark:text-gray-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-300"
                          style={{ fontFamily: 'Albert Sans, sans-serif' }}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link
                        href="/web-design-company-in-ghana"
                        className="mt-1 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors dark:text-orange-400 dark:hover:bg-orange-500/10"
                        style={{ fontFamily: 'Albert Sans, sans-serif' }}
                      >
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/portfolio"
              className={navLinkClass(isActive('/portfolio'))}
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              Portfolio
            </Link>
            <Link
              href="/pricing"
              className={navLinkClass(isActive('/pricing'))}
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={navLinkClass(isActive('/about'))}
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => openDropdown('resources')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={navLinkClass(RESOURCES.some((item) => isActive(item.href)))}
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
                aria-expanded={openMenu === 'resources'}
                onClick={() => setOpenMenu(openMenu === 'resources' ? null : 'resources')}
              >
                Resources
                <ChevronDown size={14} className={`transition-transform ${openMenu === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openMenu === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-3 w-[340px] rounded-2xl border border-black/8 bg-white p-3 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/40"
                    onMouseEnter={() => openDropdown('resources')}
                    onMouseLeave={scheduleClose}
                  >
                    {RESOURCES.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-orange-50 transition-colors dark:hover:bg-orange-500/10"
                      >
                        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                          <DropdownIcon name={item.icon} />
                        </span>
                        <span>
                          <span
                            className="block text-sm font-semibold text-gray-900 dark:text-white"
                            style={{ fontFamily: 'Albert Sans, sans-serif' }}
                          >
                            {item.name}
                          </span>
                          <span
                            className="block text-xs text-gray-500 mt-0.5 dark:text-gray-400"
                            style={{ fontFamily: 'Albert Sans, sans-serif' }}
                          >
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher variant="header" dropUp={false} />
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center rounded-full border border-gray-900 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              <span className="relative z-10 inline-flex items-center">
                Contact Us
                <CtaArrow size={15} />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsExpertModalOpen(true)}
              className="group relative inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              <span className="relative z-10 inline-flex items-center">
                Request a Service
                <CtaArrow size={15} />
              </span>
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher variant="header" dropUp={false} />
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-gray-900 dark:border-white/15 dark:text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-black/[0.06] bg-white overflow-hidden dark:border-white/10 dark:bg-gray-950"
            >
              <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-4 space-y-1">
                <Link href="/" className="block rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'm-services' ? null : 'm-services')}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Services
                  <ChevronDown size={16} className={openMenu === 'm-services' ? 'rotate-180' : ''} />
                </button>
                {openMenu === 'm-services' && (
                  <div className="ml-2 border-l border-black/10 pl-3 space-y-1 dark:border-white/10">
                    {SERVICES.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                        {item.name}
                      </Link>
                    ))}
                    <Link href="/web-design-company-in-ghana" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-orange-600 dark:text-orange-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      View all services →
                    </Link>
                  </div>
                )}

                <Link href="/portfolio" className="block rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Portfolio
                </Link>
                <Link href="/pricing" className="block rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Pricing
                </Link>
                <Link href="/about" className="block rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  About
                </Link>

                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'm-resources' ? null : 'm-resources')}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Resources
                  <ChevronDown size={16} className={openMenu === 'm-resources' ? 'rotate-180' : ''} />
                </button>
                {openMenu === 'm-resources' && (
                  <div className="ml-2 border-l border-black/10 pl-3 space-y-1 dark:border-white/10">
                    {RESOURCES.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="pt-4 space-y-2.5">
                  <Link
                    href="/contact"
                    className="group relative flex w-full items-center justify-center rounded-full border border-gray-900 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-white dark:text-white"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    <span className="relative z-10 inline-flex items-center">
                      Contact Us
                      <CtaArrow size={15} />
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsExpertModalOpen(true);
                    }}
                    className="group relative flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    <span className="relative z-10 inline-flex items-center">
                      Request a Service
                      <CtaArrow size={15} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <TalkToExpertModal isOpen={isExpertModalOpen} onClose={() => setIsExpertModalOpen(false)} />
    </>
  );
}
