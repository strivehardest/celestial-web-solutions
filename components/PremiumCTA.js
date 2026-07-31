import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PremiumCTA({ 
  children, 
  href = '/contact', 
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  size = 'default', // 'small' | 'default' | 'large'
  icon = true,
  className = '',
  external = false,
  ...props 
}) {
  const router = useRouter();
  const buttonRef = useRef(null);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

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

    if (props.type !== 'submit' && !external && href && !props.onClick) {
      router.push(href);
    }
  };

  const sizeClasses = {
    small: 'px-5 py-2.5 text-sm',
    default: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 border border-orange-400/40 shadow-lg shadow-orange-500/25 text-white hover:from-orange-600 hover:to-orange-700',
    secondary:
      'bg-white border border-white shadow-lg text-orange-600 hover:text-orange-700 hover:bg-orange-50',
    // For light page surfaces (pricing cards, tables). Use `secondary` on orange/dark heroes.
    outline:
      'bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white',
  };

  const resolvedSize = size === 'sm' ? 'small' : size;

  const ButtonContent = () => (
    <motion.span
      ref={buttonRef}
      className={`
        relative inline-flex items-center justify-center gap-3 font-bold rounded-full
        overflow-hidden cursor-pointer group
        ${sizeClasses[resolvedSize] || sizeClasses.default}
        ${variantClasses[variant] || variantClasses.primary}
        ${className}
      `}
      style={{ fontFamily: 'Bricolage Grotesque, sans-serif', ...props.style }}
      onClick={handleClick}
      {...props}
    >
      {/* Removed background slide effect for hover */}

      {/* Ripple effect */}
      {showRipple && (
        <motion.span
          className="absolute rounded-full bg-white/30"
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

      {/* Text */}
      <span className="relative z-10 transition-colors duration-300">
        {children}
      </span>

      {icon && (
        <span
          aria-hidden="true"
          className="
            relative z-10 inline-flex items-center overflow-hidden
            max-w-0 opacity-0 -translate-x-1.5 scale-75
            group-hover:max-w-[1.75rem] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        >
          <svg
            className="w-5 h-5 ml-2 shrink-0"
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
    </motion.span>
  );

  if (props.type === 'submit') {
    // Render as button for form submission
    return (
      <button type="submit" className={className} disabled={props.disabled} style={props.style} onClick={handleClick}>
        <ButtonContent />
      </button>
    );
  }

  // Always render <a> for external links or if target/rel is set
  if (external || props.target === '_blank' || props.rel) {
    return (
      <a
        href={href}
        target={props.target || (external ? '_blank' : undefined)}
        rel={props.rel || (external ? 'noopener noreferrer' : undefined)}
        className={className}
        style={props.style}
        onClick={handleClick}
        {...props}
      >
        <ButtonContent />
      </a>
    );
  }

  // Default: render as span (button-like)
  return <ButtonContent />;
}

// Secondary CTA with different style
export function OutlineCTA({ children, href = '/contact', ...props }) {
  return (
    <PremiumCTA href={href} variant="outline" {...props}>
      {children}
    </PremiumCTA>
  );
}

// Text link CTA
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
            inline-flex overflow-hidden max-w-0 opacity-0 -translate-x-1
            group-hover:max-w-[1.5rem] group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        >
          <span className="ml-2">→</span>
        </span>
      </span>
    </Link>
  );
}
