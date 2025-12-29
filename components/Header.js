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
    secondary: 'bg-white text-orange-600',
    outline: 'bg-transparent text-orange-600 border-2 border-orange-500',
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
        className={`absolute inset-0 ${variant === 'primary' ? 'bg-white' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}
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
            ? (variant === 'primary' ? '#ea580c' : '#ffffff') 
            : (variant === 'primary' ? '#ffffff' : '#ea580c'),
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
              ? (variant === 'primary' ? '#ea580c' : '#ffffff') 
              : (variant === 'primary' ? '#ffffff' : '#ea580c'),
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
          â†’
        </motion.span>
      </motion.span>
    </Link>
  );
}

// Add this WhatsApp link variable at the top of your component
const whatsappNumber = '+233245671832';
const whatsappMessage = encodeURIComponent('Hello! I am interested in your web development services.');
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

// Add WhatsApp button in your desktop navigation (next to other nav items):
<motion.a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
    scrolled
      ? 'bg-green-500 text-white hover:bg-green-600'
      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
  }`}
  style={{ fontFamily: 'Google Sans, sans-serif' }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span className="hidden lg:inline">WhatsApp</span>
</motion.a>