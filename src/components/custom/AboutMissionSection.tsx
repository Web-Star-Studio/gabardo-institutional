'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, TrendingUp, Leaf, Truck, Earth } from 'lucide-react';

// Custom EcoTruck icon with three separate icons arranged together
const EcoTruck: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className} flex items-center justify-center w-10 h-10`}>
    {/* Central Truck - main focus, larger size */}
    <Truck className="w-10 h-10 z-10" />
    
    {/* Leaf - positioned top-left, spaced away from truck */}
    <Leaf className="absolute -top-1 -left-1 w-4 h-4 opacity-80" />
    
    {/* Planet Earth - positioned bottom-right, spaced away from truck */}
    <Earth className="absolute -bottom-1 -right-1 w-4 h-4 opacity-70" />
  </div>
);

interface MissionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

// 4P's data - using same structure as mission items but with different styling
const fourPsItems: MissionItem[] = [
  {
    id: 'precisao',
    icon: <Target className="w-10 h-10" />,
    title: 'PRECISÃO',
    subtitle: 'Qualidade Garantida',
    description: 'Sistema de Gestão da Qualidade (ISO 9001) com processos documentados, PDI padronizado, manutenção preventiva e KPIs auditáveis',
    color: 'gabardo'
  },
  {
    id: 'previsibilidade',
    icon: <TrendingUp className="w-10 h-10" />,
    title: 'PREVISIBILIDADE',
    subtitle: 'Confiança Total',
    description: 'SLAs objetivos e monitorados, rastreamento em tempo real 100% da frota e comunicação proativa em cada marco de entrega',
    color: 'gabardo'
  },
  {
    id: 'protecao',
    icon: <Shield className="w-10 h-10" />,
    title: 'PROTEÇÃO',
    subtitle: 'Segurança Máxima',
    description: 'Rastreamento ponta a ponta, gestão integrada de riscos e segurança viária certificada (ISO 39001)',
    color: 'gabardo'
  },
  {
    id: 'planeta',
    icon: <EcoTruck className="w-10 h-10" />,
    title: 'PLANETA',
    subtitle: 'Sustentabilidade',
    description: 'Gestão ambiental (ISO 14001), eficiência de combustível e metas anuais de emissões com inventário GEE divulgado',
    color: 'gabardo'
  }
];

const AboutMissionSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('precisao');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading mission...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (active: boolean) => {
    return active ? 'text-white border-gabardo-blue' : 'bg-white border-gabardo-blue/20 hover:border-gabardo-blue';
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        

        {/* 4P's Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block"
            style={{color: '#132D51'}}
          >
            Compromisso Gabardo
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
            style={{color: '#132D51'}}
          >
            <span className="text-6xl md:text-7xl lg:text-8xl font-black">4P's</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-widest">
              do <span style={{color: '#38B6FF'}}>Compromisso</span>
            </span>
          </motion.h2>
        </motion.div>

        {/* 4P's Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {fourPsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setActiveItem(item.id)}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`
                  relative p-8 md:p-10 border-2 transition-all duration-500 shadow-lg hover:shadow-2xl md:h-96 hover:cursor-pointer
                  ${getColorClasses(activeItem === item.id)}
                `}
                style={activeItem === item.id ? {backgroundColor: '#132D51'} : {backgroundColor: 'white'}}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                  style={activeItem === item.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2"
                  style={activeItem === item.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {item.title}
                </h3>

                {/* Subtitle */}
                <div 
                  className="text-sm font-light tracking-wide uppercase mb-6 opacity-80"
                  style={activeItem === item.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {item.subtitle}
                </div>

                {/* Description */}
                <p 
                  className="font-light leading-relaxed text-lg"
                  style={activeItem === item.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {item.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{backgroundColor: '#38B6FF'}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutMissionSection; 