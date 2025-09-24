'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Clock } from 'lucide-react';

const NewsHeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gabardo-blue to-gabardo-light-blue overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header Content */}
        <div className="text-center text-white">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center space-x-2 mb-8"
            style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'}}
          >
            <div className="px-6 py-3 rounded-full border border-white/20">
              <span className="text-sm font-medium uppercase tracking-wider">
                Últimas Notícias • Atualizações • Cases
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8"
          >
            <span className="block">NOTÍCIAS</span>
            <span className="block text-white/90">E ATUALIZAÇÕES</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            Fique por dentro das últimas novidades, conquistas e desenvolvimentos 
            da Gabardo no setor de transporte de veículos.
          </motion.p>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Todas as Notícias</span>
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>Cases de Sucesso</span>
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Atualizações</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeroSection;
