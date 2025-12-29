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
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    secondary: 'bg-white text-orange-600 shadow-lg',
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
      `}
      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Background slide effect */}
      <motion.span
        className={`absolute inset-0 ${
          variant === 'primary' 
            ? 'bg-white' 
            : variant === 'outline' 
              ? 'bg-white/20' 
              : 'bg-gradient-to-r from-orange-500 to-orange-600'
        }`}
        initial={{ x: '-100%', skewX: '-15deg' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'left' }}
      />

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

      {/* Text with color change on hover */}
      <motion.span
        className="relative z-10"
        animate={{
          color: isHovered 
            ? (variant === 'primary' ? '#ea580c' : variant === 'outline' ? '#ffffff' : '#ffffff') 
            : (variant === 'primary' ? '#ffffff' : variant === 'outline' ? '#ffffff' : '#ea580c'),
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Arrow icon */}
      {icon && (
        <motion.span
          className="relative z-10 flex items-center"
          animate={{
            x: isHovered ? 5 : 0,
            color: isHovered 
              ? (variant === 'primary' ? '#ea580c' : variant === 'outline' ? '#ffffff' : '#ffffff') 
              : (variant === 'primary' ? '#ffffff' : variant === 'outline' ? '#ffffff' : '#ea580c'),
          }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.span>
      )}

      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 z-0"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: isHovered ? '200%' : '-100%',
          opacity: isHovered ? [0, 0.5, 0] : 0,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          width: '50%',
        }}
      />
    </motion.span>
  );

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
