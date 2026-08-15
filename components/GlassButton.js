import Link from 'next/link';
import CtaArrow from './CtaArrow';

/**
 * Variants (pick by surface):
 * - solid  → orange fill, white text  (light pages)
 * - orange → soft orange chip, orange text (light pages)
 * - dark   → subtle dark chip, dark text (light pages)
 * - white  → solid white chip, orange text (orange / dark heroes)
 * - light  → frosted glass, white text (orange / dark heroes only)
 * - outline→ white border, white text (orange / dark heroes only)
 */
const VARIANTS = {
  solid:
    'bg-orange-500 hover:bg-orange-600 border-orange-500 !text-white hover:!text-white hover:shadow-lg hover:shadow-orange-500/30',
  orange:
    'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/25 !text-orange-600 dark:!text-orange-400 hover:!text-orange-700 dark:hover:!text-orange-300 hover:shadow-lg hover:shadow-orange-500/15',
  dark:
    'bg-black/10 hover:bg-black/15 border-black/15 !text-gray-900 dark:!text-gray-100 hover:!text-orange-600 dark:hover:!text-orange-400 hover:shadow-lg',
  white:
    'bg-white hover:bg-orange-50 border-white !text-orange-600 hover:!text-orange-700 shadow-lg hover:shadow-xl',
  light:
    'bg-white/15 hover:bg-white/25 border-white/35 !text-white hover:!text-white hover:shadow-lg hover:shadow-white/10',
  outline:
    'bg-transparent hover:bg-white/10 border-2 border-white !text-white hover:!text-white hover:shadow-lg hover:shadow-white/10',
};

const ACCENT_VARIANTS = new Set(['orange', 'dark', 'white']);

export default function GlassButton({
  children,
  href,
  variant = 'solid',
  className = '',
  external = false,
  onClick,
}) {
  const resolved = VARIANTS[variant] ? variant : 'solid';
  const classes = `
    group relative inline-flex items-center justify-center
    pl-6 pr-10 py-3 rounded-full font-semibold
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    backdrop-blur-md border cursor-pointer overflow-hidden
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2
    dark:focus-visible:ring-offset-gray-900
    ${VARIANTS[resolved]}
    ${className}
  `;

  const content = (
    <>
      <span className="relative z-10 tracking-wide">{children}</span>
      <CtaArrow size={17} accent={ACCENT_VARIANTS.has(resolved)} />
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
