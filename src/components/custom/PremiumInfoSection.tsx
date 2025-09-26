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
    <section className="py-20 md:py-32 bg-gray-100 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-16 w-64 h-64 bg-gradient-to-br from-gabardo-light-blue/20 to-gabardo-blue/10 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-1/4 right-16 w-80 h-80 bg-gradient-to-br from-gabardo-light-blue/20 to-gabardo-blue/10 rounded-full opacity-30 blur-3xl" />
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
            <div className="w-12 h-px bg-gray-400"></div>
            <span className="text-sm font-mono text-gray-600 tracking-[0.3em] uppercase">
              Nossos Serviços
            </span>
            <div className="w-12 h-px bg-gray-400"></div>
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
                    ? 'bg-gabardo-blue text-white shadow-lg' 
                    : 'bg-white hover:bg-gabardo-light-blue/5 text-gray-700 hover:text-gabardo-blue border border-gray-300'
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Service Category - Slide from Left */}
              <motion.div
                className="w-full flex justify-center"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -60, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0
                  }}
                  exit={{ opacity: 0, x: -60, y: 10 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.25, 0.1, 0.25, 1], // Premium smooth easing
                    delay: 0.1 
                  }}
                  whileHover={{ x: 2, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="font-primary text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 relative"
                >
                  <span className="text-gabardo-blue font-black uppercase tracking-[0.2em]">
                    {activeItem.projectCategory}
                  </span>
                </motion.h2>
              </motion.div>
              
              {/* Service Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="font-secondary text-xl md:text-2xl text-gray-700 font-light leading-relaxed"
              >
                {activeItem.title}
              </motion.p>
              
              {/* Location Badge - Slide from Right with Creative Pop */}
              <motion.div 
                initial={{ opacity: 0, x: -60, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0
                }}
                exit={{ opacity: 0, x: -60, y: 10 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.1, 0.25, 1], // Premium smooth easing
                  delay: 0.5 
                }}
                whileHover={{ x: 2, transition: { duration: 0.3, ease: "easeOut" } }}
                className="flex items-center justify-center relative w-full"
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.2em] text-gabardo-light-blue">
                  {activeItem.location}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default PremiumInfoSection;
