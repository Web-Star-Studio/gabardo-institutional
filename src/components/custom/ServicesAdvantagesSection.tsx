'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Shield, Zap, Award } from 'lucide-react';

interface Advantage {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
  color: string;
}

const advantages: Advantage[] = [
  {
    id: 'experiencia',
    icon: <Award className="w-8 h-8" />,
    title: 'EXPERIÊNCIA CONSOLIDADA',
    description: 'Mais de 35 anos de mercado com expertise comprovada no transporte de veículos para as principais montadoras do Brasil.',
    stats: '35+ anos',
    color: 'blue'
  },
  {
    id: 'cobertura',
    icon: <Target className="w-8 h-8" />,
    title: 'COBERTURA NACIONAL',
    description: 'Presença estratégica em todo território nacional com unidades nas principais regiões e centros de distribuição.',
    stats: '14 unidades',
    color: 'emerald'
  },
  {
    id: 'frota',
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'FROTA ESPECIALIZADA',
    description: 'Frota própria e terceirizada com equipamentos modernos e especializados para diferentes tipos de veículos.',
    stats: '500+ veículos',
    color: 'amber'
  },
  {
    id: 'certificacoes',
    icon: <Shield className="w-8 h-8" />,
    title: 'CERTIFICAÇÕES ISO',
    description: 'Processos certificados nas normas ISO 9001, ISO 14001 e ISO 39001, garantindo qualidade, meio ambiente e segurança.',
    stats: '3 ISOs',
    color: 'purple'
  },
  {
    id: 'tecnologia',
    icon: <Zap className="w-8 h-8" />,
    title: 'TECNOLOGIA AVANÇADA',
    description: 'Sistemas de gestão modernos com rastreamento GPS, monitoramento em tempo real e relatórios personalizados.',
    stats: '100% rastreado',
    color: 'indigo'
  },
  {
    id: 'clientes',
    icon: <Users className="w-8 h-8" />,
    title: 'GRANDES CLIENTES',
    description: 'Parceria consolidada com as principais montadoras como Volkswagen, Mercedes-Benz, Ford, Hyundai e outras.',
    stats: '20+ montadoras',
    color: 'red'
  }
];

const ServicesAdvantagesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading advantages...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      emerald: 'from-emerald-500 to-emerald-600',
      amber: 'from-amber-500 to-amber-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      red: 'from-red-500 to-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-gabardo-light-blue/20 to-gabardo-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-gabardo-blue/20 to-gabardo-light-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
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
            Por Que Escolher a Gabardo
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Vantagens</span>
            <br />
            <span className="text-neutral-600">Competitivas</span>
          </motion.h2>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
              >
                {/* Icon & Stats */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses(advantage.color)} flex items-center justify-center text-white shadow-lg`}
                  >
                    {advantage.icon}
                  </motion.div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{color: '#132D51'}}>
                      {advantage.stats}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4" style={{color: '#132D51'}}>
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gabardo-blue/5 to-gabardo-light-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                  className="absolute bottom-0 left-0 h-1"
                  style={{backgroundColor: '#38B6FF'}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide">
            Números que Comprovam Nossa Excelência
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">35+</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">14</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Unidades Operacionais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500K+</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Veículos Transportados/Ano</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Grandes Clientes</div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              className="px-8 py-4 bg-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{color: '#132D51'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Solicite Sua Cotação
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesAdvantagesSection;
