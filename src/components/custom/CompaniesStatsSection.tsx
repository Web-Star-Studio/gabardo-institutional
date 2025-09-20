'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Image from 'next/image';

const CompaniesStatsSection: React.FC = () => {

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-40 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-30 blur-3xl" />
        </div>

        {/* First Section - Companies */}
        <div className="relative z-10 mb-20 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 shadow-md border border-white/20"
              >
                <Users className="w-4 h-4" />
                <span className="uppercase tracking-wider">Clientes Gabardo</span>
              </motion.div>

              {/* Main Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                <span className="block">E AS EMPRESAS</span>
                <span className="block">QUE CONFIAM</span>
                <span className="block text-blue-accent">NA GABARDO?!</span>
              </motion.h2>

              {/* Decorative Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-white to-white/40 transform origin-left"
              />
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              
              {/* Background Shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl transform rotate-2 opacity-50" />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 p-4">
                <Image
                  src="/images/Grupo-49.png"
                  alt="Empresas clientes da Gabardo"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>

              {/* Floating Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 text-white p-4 rounded-xl shadow-lg bg-blue-glow"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Veículos</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompaniesStatsSection; 