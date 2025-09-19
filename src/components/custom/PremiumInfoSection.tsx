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
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<ProjectCategoryType>(PROJECT_CATEGORIES[0]);

  // Show only the first item for each category
  const activeItem = infoItems.find(item => item.projectCategory === selectedProjectCategory) || infoItems[0];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      
      {/* Subtle Background Pattern - matching ProjectGallery aesthetic */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Main Content Grid - matching ProjectGallery structure */}
      <div className="relative h-full grid grid-cols-12 grid-rows-12 gap-4 p-8">
        
        {/* Info Display - Top Left (like ProjectGallery) */}
        <div className="col-span-3 row-span-2 col-start-1 row-start-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${activeItem.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-1"
            >
              <div className="text-white/60 text-xs font-mono tracking-widest uppercase">
                {activeItem.location}
              </div>
              <div className="text-white text-lg font-light tracking-wide">
                {activeItem.projectCategory}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls - Top Right (matching ProjectGallery) */}
        <div className="col-span-2 row-span-2 col-start-11 row-start-1 flex flex-col items-end justify-center gap-3">
          {/* City Selection */}
          <nav className="flex gap-2" role="tablist" aria-label="City selection">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                role="tab"
                aria-selected={selectedCity === city}
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-sm ${
                  selectedCity === city 
                    ? 'bg-white text-black shadow-lg' 
                    : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </nav>

          {/* Category Selection */}
          <nav className="flex gap-2" role="tablist" aria-label="Service Category selection">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedProjectCategory(category)}
                role="tab"
                aria-selected={selectedProjectCategory === category}
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-sm ${
                  selectedProjectCategory === category 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area - Center (like ProjectGallery featured image area) */}
        <div className="col-span-8 row-span-8 col-start-3 row-start-3 relative flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${activeItem.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-6"
            >
              {/* Service Category */}
              <h2 className="text-2xl md:text-3xl font-bold uppercase text-amber-400 mb-4 tracking-wide">
                {activeItem.projectCategory}
              </h2>
              
              {/* Service Description */}
              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white mb-6 max-w-4xl">
                {activeItem.title}
              </p>
              
              {/* Location Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="text-sm font-medium uppercase tracking-widest text-white/90">
                  {activeItem.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>


        {/* Subtle Decoration Lines (matching ProjectGallery) */}
        <div className="col-span-1 row-span-6 col-start-2 row-start-4 flex items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
        <div className="col-span-1 row-span-6 col-start-11 row-start-4 flex items-center justify-end">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* Keyboard Hint (matching ProjectGallery) */}
      <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono tracking-wider">
        <span className="opacity-50">← → SPACE</span>
      </div>
    </section>
  );
};

export default PremiumInfoSection;
