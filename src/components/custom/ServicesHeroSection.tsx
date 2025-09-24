'use client';
import { motion } from 'framer-motion';
import { Dot, Mouse } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Background images for Services section
const backgroundImages = [
  '/images/gabardo-hero-01.JPG', 
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/gabardo-hero-new.jpg'
];

const ScrollDownIcon = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="hidden md:flex flex-col items-center space-y-2"
  >
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Nossos Serviços
    </span>
  </motion.div>
);

const ArrowIcon = () => (
  <motion.svg 
    initial={{ opacity: 0, rotate: -45 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 1, delay: 2 }}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-12 h-12 md:w-16 md:h-16"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" />
  </motion.svg>
);

export default function ServicesHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1.02 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt={`Gabardo Services ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              onLoad={() => index === 0 && setIsLoaded(true)}
            />
          </motion.div>
        ))}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white z-20">
        <ScrollDownIcon />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
          >
            <span className="block">OPERAÇÕES DEDICADAS</span>
            <span className="block">E EQUIPE ESPECIALIZADA</span>
            <span className="block" style={{color: '#38B6FF'}}>POR PREÇO COMPETITIVO</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base text-white/90 font-light leading-relaxed mb-8 max-w-3xl"
          >
            A Gabardo está presente nas principais rotas do país com uma das frotas mais especializadas 
            em transporte de veículos. Atendemos de forma personalizada montadoras e empresas de diversos 
            segmentos com operações exclusivas e preços mais competitivos que a concorrência.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              className="px-8 py-4 text-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#38B6FF'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2da5ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38B6FF'}
            >
              Solicitar Cotação
            </button>
            <button 
              className="px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wide transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#38B6FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Ver Todos os Serviços
            </button>
          </motion.div>
        </div>

        {/* Arrow Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-white"
        >
          <ArrowIcon />
        </motion.div>
      </div>

      {/* Image Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"
      >
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </motion.div>
    </section>
  );
}
