import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const POINTER_HOTSPOT = { x: 2, y: 2 };

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);

        const cursorTextAttr =
          target.getAttribute('data-cursor-text') ||
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

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const bindHover = () => {
      document.querySelectorAll('a, button, .cursor-hover, [data-cursor-text]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    bindHover();

    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      style={{
        transform: `translate3d(${position.x - POINTER_HOTSPOT.x}px, ${position.y - POINTER_HOTSPOT.y}px, 0)`,
      }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.88 : isHovering ? 1.12 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="drop-shadow-md"
        >
          <path
            d="M5.5 3.21V20.79C5.5 21.24 5.99 21.52 6.37 21.27L12.04 17.6L14.26 22.74C14.43 23.12 14.87 23.29 15.25 23.12L17.54 22.12C17.92 21.95 18.09 21.51 17.92 21.13L15.69 15.99L22.04 14.99C22.46 14.92 22.64 14.41 22.35 14.09L6.35 2.99C5.99 2.72 5.5 2.96 5.5 3.21Z"
            fill="#f97316"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        </svg>

        {cursorText && (
          <span
            className="absolute left-5 top-0 text-white text-xs font-bold whitespace-nowrap bg-orange-500 px-2 py-1 rounded-full shadow-lg"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
