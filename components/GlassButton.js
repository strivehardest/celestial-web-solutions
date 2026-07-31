import Link from 'next/link';
import CtaArrow from './CtaArrow';

const VARIANTS = {
  light:
    'bg-white/15 hover:bg-white/25 border-white/35 text-white hover:text-orange-100 hover:shadow-lg hover:shadow-white/10',
  dark:
    'bg-black/10 hover:bg-black/15 border-black/15 text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 hover:shadow-lg',
  orange:
    'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/25 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:shadow-lg hover:shadow-orange-500/15',
  solid:
    'bg-orange-500 hover:bg-orange-600 border-orange-500 text-white hover:text-white hover:shadow-lg hover:shadow-orange-500/30',
};

export default function GlassButton({
  children,
  href,
  variant = 'light',
  className = '',
  external = false,
  onClick,
}) {
  const classes = `
    group relative inline-flex items-center justify-center
    px-6 py-3 rounded-full font-semibold
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    backdrop-blur-md border cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2
    dark:focus-visible:ring-offset-gray-900
    ${VARIANTS[variant] || VARIANTS.light}
    ${className}
  `;

  const content = (
    <>
      <span className="relative z-10 tracking-wide">{children}</span>
      <CtaArrow size={17} accent={variant === 'orange' || variant === 'dark'} />
    </>
  );

  const style = { fontFamily: 'Albert Sans, sans-serif', fontWeight: 500 };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={style}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style} onClick={onClick}>
      {content}
    </Link>
  );
}
