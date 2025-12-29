import { useState, useRef } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  const sizeClasses = {
    small: 'px-5 py-2.5 text-sm',
    default: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary: 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-orange-700 dark:text-white',
    secondary: 'bg-white/30 backdrop-blur-md border border-white/30 shadow-lg text-orange-600',
    outline: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
  };

  const ButtonContent = () => (
    <motion.span
      ref={buttonRef}
      className={`
        relative inline-flex items-center justify-center gap-3 font-bold rounded-full
        overflow-hidden cursor-pointer group
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        glass-cta
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

      {/* Text without color change on hover */}
      <span className="relative z-10">
        {children}
      </span>

      {/* Arrow icon without hover effect */}
      {icon && (
        <span className="relative z-10 flex items-center">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </span>
      )}

      {/* Removed shine effect for hover */}
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
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ButtonContent />
      </a>
    );
  }
  return (
    <Link href={href}>
      <ButtonContent />
    </Link>
  );
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.span
        className={`inline-flex items-center gap-2 font-bold text-orange-600 cursor-pointer group ${className}`}
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span className="relative">
          {children}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-orange-600"
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </span>
        <motion.span
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.span>
      </motion.span>
    </Link>
  );
}
