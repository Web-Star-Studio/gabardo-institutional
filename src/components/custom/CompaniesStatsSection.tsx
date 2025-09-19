'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const CompaniesStatsSection: React.FC = () => {
  const stats = [
    {
      percentage: "98%",
      description: "dos clientes recomendam nossos serviços",
      metric: "Satisfação"
    },
    {
      percentage: "35+",
      description: "anos de experiência no mercado",
      metric: "Experiência"
    },
    {
      percentage: "100%",
      description: "dos veículos transportados com seguro",
      metric: "Segurança"
    },
    {
      percentage: "24/7",
      description: "monitoramento e rastreamento",
      metric: "Monitoramento"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-neutral-100/50 to-neutral-200/30 rounded-full opacity-40 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-neutral-100/40 to-neutral-200/20 rounded-full opacity-30 blur-3xl" />
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
                className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-neutral-700 shadow-md border border-neutral-200"
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
              >
                <span className="block">E AS EMPRESAS</span>
                <span className="block">QUE CONFIAM</span>
                <span className="block text-neutral-600">NA GABARDO?!</span>
              </motion.h2>

              {/* Decorative Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-black to-neutral-400 transform origin-left"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-neutral-200 to-neutral-100 rounded-3xl transform rotate-2 opacity-50" />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
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
                className="absolute -top-4 -right-4 bg-black text-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Veículos</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Second Section - Stats */}
        <div className="relative z-10">
          
          {/* Stats Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6"
            >
              O QUE NOSSOS
              <br />
              <span className="text-neutral-600">CLIENTES DIZEM?!</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              Resultados reais de empresas que confiam na Gabardo para o transporte de seus veículos
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="group relative"
              >
                
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-neutral-200/50 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-neutral-300/50 hover:-translate-y-1 relative overflow-hidden">
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/0 via-neutral-100/20 to-neutral-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    
                    {/* Metric Label */}
                    <div className="mb-6">
                      <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium bg-neutral-100 px-3 py-1 rounded-full">
                        {stat.metric}
                      </span>
                    </div>

                    {/* Percentage */}
                    <div className="mb-6">
                      <span className="text-5xl md:text-6xl font-bold text-black group-hover:text-neutral-800 transition-colors duration-300">
                        {stat.percentage}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base font-medium">
                      {stat.description}
                    </p>

                    {/* Minimalist Line Accent */}
                    <div className="mt-8 w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent group-hover:from-accent group-hover:w-20 transition-all duration-500" />
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-20"
          >
            <p className="text-lg text-neutral-600 mb-8 font-medium">
              Quer fazer parte dessas estatísticas?
            </p>
            <button className="bg-amber-500/80 hover:bg-amber-600/80 text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl uppercase tracking-wide text-sm">
              Solicitar Cotação
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesStatsSection; 