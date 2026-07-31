import { ArrowRight } from 'lucide-react';

/**
 * Arrow that stays hidden until the parent `.group` is hovered/focused.
 * Works on light and dark surfaces via currentColor + optional accent.
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
        cta-arrow inline-flex items-center justify-center overflow-hidden
        max-w-0 opacity-0 -translate-x-1.5 scale-75
        group-hover:max-w-[1.75rem] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
        group-focus-visible:max-w-[1.75rem] group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${className}
      `}
    >
      <span
        className={`
          inline-flex items-center justify-center ml-2
          ${accent
            ? 'text-orange-600 dark:text-orange-400 group-hover:text-orange-500 dark:group-hover:text-orange-300'
            : 'text-current'}
        `}
      >
        <ArrowRight
          size={size}
          strokeWidth={2.35}
          className="shrink-0"
        />
      </span>
    </span>
  );
}
