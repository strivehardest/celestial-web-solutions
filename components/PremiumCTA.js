import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CtaArrow from './CtaArrow';

function isExternalHref(href = '', { external, target } = {}) {
  if (external || target === '_blank') return true;
  return /^(https?:|tel:|mailto:|sms:)/i.test(href);
}

export default function PremiumCTA({
  children,
  href = '/contact',
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  size = 'default', // 'small' | 'default' | 'large' | 'sm'
  icon = true,
  className = '',
  external = false,
  type,
  target,
  rel,
  onClick,
  style,
  disabled,
  ...props
}) {
  const router = useRouter();
  const buttonRef = useRef(null);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const resolvedSize = size === 'sm' ? 'small' : size;
  const externalLink = isExternalHref(href, { external, target });

  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }

    if (onClick) {
      onClick(e);
      return;
    }

    // External / tel / mailto handled by the <a> itself — do not router.push
    if (type === 'submit' || externalLink || !href) return;

    e.preventDefault();
    router.push(href);
  };

  const sizeClasses = {
    small: 'pl-5 pr-9 py-2.5 text-sm',
    default: 'pl-8 pr-11 py-4 text-base',
    large: 'pl-10 pr-12 py-5 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 border border-orange-400/40 shadow-lg shadow-orange-500/25 text-white hover:from-orange-600 hover:to-orange-700',
    secondary:
      'bg-white border border-white shadow-lg text-orange-600 hover:text-orange-700 hover:bg-orange-50',
    outline:
      'bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white',
  };

  const classes = `
    group relative inline-flex items-center justify-center font-bold rounded-full
    overflow-hidden cursor-pointer
    ${sizeClasses[resolvedSize] || sizeClasses.default}
    ${variantClasses[variant] || variantClasses.primary}
    ${className}
  `;

  const content = (
    <>
      {showRipple && (
        <motion.span
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Label stays centered; arrow overlays right padding on hover (no layout shift) */}
      <span className="relative z-10 tracking-wide transition-colors duration-300">
        {children}
      </span>

      {icon && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute right-4 top-1/2 z-10
            -translate-y-1/2 translate-x-1 opacity-0
            group-hover:translate-x-0 group-hover:opacity-100
            group-focus:translate-x-0 group-focus:opacity-100
            group-focus-visible:translate-x-0 group-focus-visible:opacity-100
            group-active:translate-x-0 group-active:opacity-100
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        >
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      )}
    </>
  );

  const sharedStyle = { fontFamily: 'Bricolage Grotesque, sans-serif', ...style };

  if (type === 'submit') {
    return (
      <motion.button
        ref={buttonRef}
        type="submit"
        className={classes}
        style={sharedStyle}
        disabled={disabled}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  if (externalLink) {
    return (
      <motion.a
        ref={buttonRef}
        href={href}
        target={target || (external ? '_blank' : undefined)}
        rel={rel || (external || target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        style={sharedStyle}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={classes}
      style={sharedStyle}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export function OutlineCTA({ children, href = '/contact', ...props }) {
  return (
    <PremiumCTA href={href} variant="outline" {...props}>
      {children}
    </PremiumCTA>
  );
}

export function TextCTA({ children, href = '/contact', className = '', ...props }) {
  return (
    <Link href={href}>
      <span
        className={`group inline-flex items-center font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 cursor-pointer transition-colors duration-300 ${className}`}
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        {...props}
      >
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current group-hover:w-full transition-all duration-300 ease-out" />
        </span>
        <span
          aria-hidden="true"
          className="
            ml-1 inline-flex w-4 shrink-0 justify-end
            opacity-0 -translate-x-1
            group-hover:opacity-100 group-hover:translate-x-0
            group-focus:opacity-100 group-focus:translate-x-0
            group-active:opacity-100 group-active:translate-x-0
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        >
          →
        </span>
      </span>
    </Link>
  );
}
