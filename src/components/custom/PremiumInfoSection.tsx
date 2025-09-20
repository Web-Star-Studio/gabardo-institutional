'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CITIES = ["PORTO ALEGRE", "SÃO PAULO", "RIO DE JANEIRO", "GOIÁS"] as const;
type City = typeof CITIES[number];

const PROJECT_CATEGORIES = ["TRANSPORTE", "LOGÍSTICA", "SEGURANÇA"] as const;
type ProjectCategoryType = typeof PROJECT_CATEGORIES[number];

interface InfoItem {
  id: string;
  title: string;
  projectCategory: ProjectCategoryType;
  location: string;
}

// Content data inspired by JSL's service approach
const infoItems: InfoItem[] = [
  {
    id: 'transporte-veiculos-1',
    title: 'Possuímos uma das maiores e mais modernas frotas de cegonheiras. Atendemos de forma personalizada em todas as regiões do Brasil.',
    projectCategory: 'TRANSPORTE',
    location: 'NACIONAL'
  },
  {
    id: 'logistica-integrada-1', 
    title: 'Gerenciamos serviços integrados de coleta, armazenagem e distribuição de veículos com tecnologia embarcada.',
    projectCategory: 'LOGÍSTICA',
    location: 'INTEGRADA'
  },
  {
    id: 'seguranca-total-1',
    title: 'Desenvolvemos soluções completas com seguro total, rastreamento satelital e profissionais capacitados.',
    projectCategory: 'SEGURANÇA', 
    location: 'GARANTIDA'
  }
];

const PremiumInfoSection: React.FC = () => {
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<ProjectCategoryType>(PROJECT_CATEGORIES[0]);

  // Show only the first item for each category
  const activeItem = infoItems.find(item => item.projectCategory === selectedProjectCategory) || infoItems[0];

  return (
    <section className="py-20 md:py-32 bg-neutral-900 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-16 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-1/4 right-16 w-80 h-80 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-white/30"></div>
            <span className="text-sm font-mono text-white/60 tracking-[0.3em] uppercase">
              Nossos Serviços
            </span>
            <div className="w-12 h-px bg-white/30"></div>
          </div>
          
          {/* Category Selection */}
          <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Service Category selection">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedProjectCategory(category)}
                role="tab"
                aria-selected={selectedProjectCategory === category}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full ${
                  selectedProjectCategory === category 
                    ? 'bg-white text-black shadow-lg' 
                    : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${activeItem.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Service Category */}
              <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-blue-accent">{activeItem.projectCategory}</span>
              </h2>
              
              {/* Service Description */}
              <p className="font-secondary text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                {activeItem.title}
              </p>
              
              {/* Location Badge */}
              <div className="inline-flex items-center px-8 py-4 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="text-base font-medium uppercase tracking-widest text-white/90">
                  {activeItem.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-white/30"></div>
              <span className="text-sm font-mono text-white/60 tracking-[0.3em] uppercase">
                Números que Falam
              </span>
              <div className="w-12 h-px bg-white/30"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '35+', label: 'Anos de Experiência', description: 'Mercado consolidado', type: 'text' },
              { number: '500+', label: 'Clientes Atendidos', description: 'Confiança nacional', type: 'text' },
              { number: '24/7', label: 'Suporte Disponível', description: 'Sempre conectados', type: 'text' },
              { number: '98%', label: 'Satisfação', description: 'Excelência comprovada', type: 'star' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 hover-blue-80 transition-colors duration-300 flex items-center justify-center gap-2">
                  {stat.number}
                  {stat.type === 'star' && (
                    <span className="w-8 h-8 lg:w-10 lg:h-10 inline-block text-blue-bright">★</span>
                  )}
                </div>
                <div className="text-lg font-bold text-white/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/60 font-light">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumInfoSection;
