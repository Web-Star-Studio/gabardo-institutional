'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Weight, Truck, Shield } from 'lucide-react';

const PranchaHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5388.JPG"
          alt="Gabardo Prancha Transport"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center space-x-2 mb-8"
            style={{backgroundColor: 'rgba(56, 182, 255, 0.1)', backdropFilter: 'blur(10px)'}}
          >
            <div className="px-6 py-3 rounded-full border border-white/20">
              <span className="text-sm font-medium text-white uppercase tracking-wider">
                Transporte Especializado • Cargas Pesadas
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8"
          >
            <span className="block">TRANSPORTE</span>
            <span className="block">EM PRANCHA</span>
            <span className="block" style={{color: '#38B6FF'}}>ESPECIALIZADO</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-4xl"
          >
            Soluções especializadas para transporte de veículos pesados, máquinas e equipamentos 
            com pranchas dedicadas e equipe técnica altamente qualificada.
          </motion.p>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Weight className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50T</div>
                <div className="text-white/80">Capacidade Máxima</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-white/80">Pranchas Especializadas</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/80">Seguro Especializado</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              className="px-12 py-5 text-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{backgroundColor: '#38B6FF'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2da5ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38B6FF'}
            >
              Cotação Especializada
            </button>
            <button 
              className="px-12 py-5 border-3 border-white text-white font-bold text-lg uppercase tracking-wide transition-all duration-300"
              style={{borderWidth: '3px'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#132D51';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Ver Capacidades
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PranchaHeroSection;
