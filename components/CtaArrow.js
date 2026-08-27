import { ArrowRight } from 'lucide-react';

/**
 * Expanding hover arrow for parent `.group` CTAs.
 * Reveals on hover, focus, and press without jumping the label abruptly.
 */
export default function CtaArrow({
  size = 18,
  className = '',
  accent = false,
}) {
  return (
    <span
      aria-hidden="true"
      className={`
        cta-arrow inline-flex overflow-hidden max-w-0 opacity-0
        -translate-x-1
        group-hover:max-w-[1.5rem] group-hover:opacity-100 group-hover:translate-x-0
        group-focus:max-w-[1.5rem] group-focus:opacity-100 group-focus:translate-x-0
        group-focus-visible:max-w-[1.5rem] group-focus-visible:opacity-100 group-focus-visible:translate-x-0
        group-active:max-w-[1.5rem] group-active:opacity-100 group-active:translate-x-0
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${accent
          ? 'text-orange-600 dark:text-orange-400'
          : 'text-current'}
        ${className}
      `}
    >
      <ArrowRight size={size} strokeWidth={2.35} className="ml-1.5 shrink-0" />
    </span>
  );
}
