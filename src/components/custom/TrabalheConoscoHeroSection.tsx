'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrabalheConoscoHeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gabardo-blue to-gabardo-light-blue overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8"
          >
            <span className="block">FAÇA PARTE DA NOSSA EQUIPE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            Junte-se à empresa com o maior e mais integrado portfólio logístico do país!
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoHeroSection;
