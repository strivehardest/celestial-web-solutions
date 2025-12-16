import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MouseTrail() {
  const [trails, setTrails] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    let trailId = 0;
    let lastTime = 0;
    const throttleTime = 50; // Slower trail - only add every 50ms

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleTime) return;
      lastTime = now;

      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails(prev => [...prev.slice(-8), newTrail]); // Keep fewer trails
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up old trails slower
    const cleanupInterval = setInterval(() => {
      setTrails(prev => prev.slice(-6));
    }, 150);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }} // Slower fade
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
            style={{
              left: trail.x,
              top: trail.y,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px rgba(249, 115, 22, 0.6)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
