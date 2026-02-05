import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Slower, smoother spring animation for cursor
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
        
        // Get custom cursor text if available
        const cursorTextAttr = target.getAttribute('data-cursor-text') || 
                               target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (cursorTextAttr) {
          setCursorText(cursorTextAttr);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover detection to all interactive elements
    document.querySelectorAll('a, button, .cursor-hover, [data-cursor-text]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .cursor-hover, [data-cursor-text]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot - ORANGE */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Main cursor dot */}
          <motion.div
            className="w-3 h-3 rounded-full absolute"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{
              background: isHovering 
                ? 'linear-gradient(to right, #f97316, #ea580c)' 
                : 'linear-gradient(to right, #f97316, #ea580c)',
              boxShadow: isHovering 
                ? '0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(249, 115, 22, 0.4)' 
                : '0 0 8px rgba(249, 115, 22, 0.5)',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Outer ring - only shows on hover */}
          <motion.div
            className="w-8 h-8 rounded-full absolute border-2 border-orange-500"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5,
              borderColor: isHovering ? '#f97316' : 'transparent',
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Pointer icon - shows on hover over clickable elements */}
          {isHovering && !cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute"
              style={{ 
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                <path 
                  d="M5.5 3.21V20.79C5.5 21.24 5.99 21.52 6.37 21.27L12.04 17.6L14.26 22.74C14.43 23.12 14.87 23.29 15.25 23.12L17.54 22.12C17.92 21.95 18.09 21.51 17.92 21.13L15.69 15.99L22.04 14.99C22.46 14.92 22.64 14.41 22.35 14.09L6.35 2.99C5.99 2.72 5.5 2.96 5.5 3.21Z" 
                  fill="#f97316"
                  stroke="#fff"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          )}

          {/* Custom cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute text-white text-xs font-bold whitespace-nowrap bg-orange-500 px-2 py-1 rounded-full shadow-lg"
              style={{ 
                transform: 'translate(-50%, -200%)',
                fontFamily: 'Bricolage Grotesque, sans-serif'
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
