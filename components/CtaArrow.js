import { ArrowRight } from 'lucide-react';

/**
 * Arrow shown only while the parent `.group` is pressed or focused
 * (not on hover). Absolutely positioned so the label does not shift.
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
        cta-arrow pointer-events-none absolute right-4 top-1/2 z-10
        -translate-y-1/2 translate-x-1 opacity-0
        group-focus:translate-x-0 group-focus:opacity-100
        group-focus-visible:translate-x-0 group-focus-visible:opacity-100
        group-active:translate-x-0 group-active:opacity-100
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${accent
          ? 'text-orange-600 dark:text-orange-400'
          : 'text-current'}
        ${className}
      `}
    >
      <ArrowRight size={size} strokeWidth={2.35} className="shrink-0" />
    </span>
  );
}
