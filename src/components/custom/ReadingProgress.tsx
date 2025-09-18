'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Clock, Eye } from 'lucide-react';

interface ReadingProgressProps {
  readTime: string;
  className?: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ readTime, className = '' }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(readTime);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      
      setReadingProgress(progress);
      
      // Calculate estimated time left
      const totalMinutes = parseInt(readTime.replace(' min', ''));
      const minutesLeft = Math.max(Math.ceil(totalMinutes * (100 - progress) / 100), 0);
      
      if (minutesLeft > 0) {
        setEstimatedTimeLeft(`${minutesLeft} min restante${minutesLeft !== 1 ? 's' : ''}`);
      } else {
        setEstimatedTimeLeft('Concluído');
      }

      // Show/hide based on scroll position
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [readTime]);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      >
        <div className="h-full bg-gradient-to-r from-white via-white/80 to-white/60" />
      </motion.div>

      {/* Floating Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-8 right-8 bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl p-4 z-40 ${className}`}
      >
        <div className="flex items-center space-x-3 text-white">
          
          {/* Progress Circle */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="3"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - readingProgress / 100)}`}
                transition={{ duration: 0.3 }}
              />
            </svg>
            
            {/* Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {Math.round(readingProgress)}%
              </span>
            </div>
          </div>

          {/* Reading Info */}
          <div className="text-sm">
            <div className="flex items-center space-x-2 text-white/80">
              <BookOpen className="w-4 h-4" />
              <span>Lendo</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 mt-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{estimatedTimeLeft}</span>
            </div>
          </div>
        </div>

        {/* Reading Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-2 -right-2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-white/90 transition-colors duration-300"
          title="Modo de leitura"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </>
  );
};

export default ReadingProgress; 