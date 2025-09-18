'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 8, 
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      mixBlendMode: 'difference' as const, 
      transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.1 },
    },
    // linkHover variant can be re-added later with more targeted logic if needed
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      variants={cursorVariants}
      animate='default' // Always use default variant for now
    />
  );
};

export default CustomCursor;