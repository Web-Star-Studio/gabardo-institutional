'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const heroImage = '/images/gabardo-hero-03.JPG';

const TrabalheConoscoHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Colaboradores da Gabardo em operação"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs sm:text-sm font-light tracking-[0.3em] text-gabardo-light-blue uppercase mb-5"
        >
          Nosso time move a logística do Brasil
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
        >
          Construa sua carreira com a Gabardo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-10"
        >
          Somos apaixonados por desenvolver pessoas, acelerar talentos e criar oportunidades em um ambiente que valoriza diversidade, inovação e resultados.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">Role para conhecer nossas iniciativas</span>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrabalheConoscoHeroSection;
