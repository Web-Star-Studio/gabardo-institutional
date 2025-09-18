'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Heart, Truck, Shield, Award } from 'lucide-react';

interface MissionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const missionItems: MissionItem[] = [
  {
    id: 'mission',
    icon: <Target className="w-10 h-10" />,
    title: 'MISSÃO',
    subtitle: 'Nosso Propósito',
    description: 'Atender as necessidades de nossos clientes de forma segura, ágil, sustentável, com qualidade e tecnologia, sendo referência em soluções logísticas e no transporte de veículos.',
    color: 'amber'
  },
  {
    id: 'vision',
    icon: <Eye className="w-10 h-10" />,
    title: 'VISÃO',
    subtitle: 'Nosso Futuro',
    description: 'Ser reconhecida como a empresa mais confiável e inovadora no transporte de veículos da América Latina, sempre à frente das necessidades dos clientes com soluções tecnológicas avançadas.',
    color: 'blue'
  },
  {
    id: 'values',
    icon: <Heart className="w-10 h-10" />,
    title: 'VALORES',
    subtitle: 'Nossa Essência',
    description: 'Segurança, qualidade, sustentabilidade, inovação e excelência no atendimento. Compromisso com a proteção ao meio ambiente e segurança viária em todas as nossas operações.',
    color: 'emerald'
  }
];

const principles = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Transporte Seguro',
    description: 'Segurança total dos veículos transportados com seguro completo e rastreamento'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Qualidade Certificada',
    description: 'Certificados ISO 9001, 14001, 39001 e Carbono Neutro garantindo excelência'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Tecnologia Avançada',
    description: 'Sistema de rastreamento via satélite e frota com tecnologia embarcada'
  }
];

const AboutMissionSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('mission');

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

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      amber: active ? 'bg-amber-400 text-white border-amber-400' : 'bg-white text-amber-400 border-amber-200 hover:border-amber-400',
      blue: active ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-200 hover:border-blue-500',
      emerald: active ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-emerald-500 border-emerald-200 hover:border-emerald-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
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
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Nossos Compromissos
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Missão, Visão e
            <br />
            <span className="text-neutral-600">Valores</span>
          </motion.h2>
        </motion.div>

        {/* Mission, Vision, Values Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {missionItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setActiveItem(item.id)}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`
                  relative p-8 md:p-10 border-2 transition-all duration-500 shadow-lg hover:shadow-2xl bg-${item.color}-500 md:h-96 hover:cursor-pointer
                  ${getColorClasses(item.color, activeItem === item.id)}
                `}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <div className="text-sm font-light tracking-wide uppercase mb-6 opacity-80">
                  {item.subtitle}
                </div>

                {/* Description */}
                <p className="font-light leading-relaxed text-lg">
                  {item.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  className={`
                    absolute bottom-0 left-0 h-1 transition-all duration-500
                    ${item.color === 'amber' ? 'bg-amber-400' : item.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'}
                  `}
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