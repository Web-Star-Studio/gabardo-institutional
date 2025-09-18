'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Optimized background images for performance
const backgroundImages = [
  '/images/co-01.jpg',
  '/images/co-03.jpg', 
  '/images/co-5.jpg'
];

export default function ContactHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Slower background rotation on mobile for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, isMobile ? 10000 : 7000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactAction = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      window.location.href = action;
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      
      {/* Optimized Dynamic Background */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0
            }}
            transition={{ duration: isMobile ? 3 : 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={img}
              alt="Hub Plural Workspace"
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              quality={isMobile ? 85 : 95}
            />
          </motion.div>
        ))}
        
        {/* Mobile-optimized overlay for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85 md:bg-gradient-to-br md:from-black/75 md:via-black/60 md:to-black/75" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          
          {/* Content Wrapper - Mobile-first approach */}
          <div className="max-w-4xl mx-auto text-center md:text-left">
            
            {/* Header Spacer for mobile */}
            <div className="h-48 md:h-48"></div>
            
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm font-light tracking-[0.3em] text-amber-400 mb-4 md:mb-6 uppercase"
            >
              Entre em Contato
            </motion.div>

            {/* Main Title - Optimized for mobile reading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.9] mb-6 md:mb-8 text-white"
            >
              Vamos
              <br />
              <span className="text-amber-400">Conversar</span>
            </motion.h1>

            {/* Description - Simplified for mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto md:mx-0"
            >
              Descubra como podemos transformar sua forma de trabalhar. 
              Nossa equipe está pronta para atender você.
            </motion.p>

            {/* Action Buttons - Mobile-optimized layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16 justify-center md:justify-start"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="group bg-amber-400 text-black px-8 py-4 text-lg font-bold uppercase tracking-wide hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 touch-manipulation rounded-lg shadow-lg"
              >
                <span>Enviar Mensagem</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Secondary CTAs - Mobile-optimized */}
              <div className="flex gap-3 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('tel:+558130303030')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-lg transition-all duration-300 touch-manipulation group"
                  aria-label="Ligar para Hub Plural"
                >
                  <Phone className="w-6 h-6 group-hover:text-amber-400 transition-colors duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('mailto:contato@hubplural.com')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-lg transition-all duration-300 touch-manipulation group"
                  aria-label="Enviar e-mail para Hub Plural"
                >
                  <Mail className="w-6 h-6 group-hover:text-amber-400 transition-colors duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('https://maps.google.com?q=Recife+PE')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-lg transition-all duration-300 touch-manipulation group"
                  aria-label="Ver localização no mapa"
                >
                  <MapPin className="w-6 h-6 group-hover:text-amber-400 transition-colors duration-300" />
                </motion.button>
              </div>
            </motion.div>
            {/* Footer spacer for mobile */}
            <div className="h-16 md:h-20"></div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            animate={{ height: [0, 20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-amber-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 