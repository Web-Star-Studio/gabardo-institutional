'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Zap, Globe } from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const serviceFeatures: FeatureItem[] = [
  {
    id: 'seguranca',
    icon: <Shield className="w-10 h-10" />,
    title: 'SEGURANÇA',
    subtitle: 'Proteção Total',
    description: 'Rastreamento GPS em tempo real, seguros completos e protocolos rigorosos de segurança para garantir a integridade dos veículos transportados.',
    color: 'gabardo'
  },
  {
    id: 'agilidade',
    icon: <Clock className="w-10 h-10" />,
    title: 'AGILIDADE',
    subtitle: 'Prazos Cumpridos',
    description: 'Otimização de rotas, frota dedicada e processos eficientes que garantem entregas dentro dos prazos estabelecidos.',
    color: 'gabardo'
  },
  {
    id: 'qualidade',
    icon: <Award className="w-10 h-10" />,
    title: 'QUALIDADE',
    subtitle: 'Certificação ISO',
    description: 'Processos certificados ISO 9001, ISO 14001 e ISO 39001, garantindo os mais altos padrões de qualidade e sustentabilidade.',
    color: 'gabardo'
  },
  {
    id: 'atendimento',
    icon: <Users className="w-10 h-10" />,
    title: 'ATENDIMENTO',
    subtitle: 'Suporte 24/7',
    description: 'Equipe especializada disponível 24 horas para acompanhamento, suporte e comunicação proativa sobre o status das entregas.',
    color: 'gabardo'
  },
  {
    id: 'tecnologia',
    icon: <Zap className="w-10 h-10" />,
    title: 'TECNOLOGIA',
    subtitle: 'Inovação Constante',
    description: 'Sistemas de gestão avançados, rastreamento em tempo real e plataformas digitais para total transparência e controle.',
    color: 'gabardo'
  },
  {
    id: 'cobertura',
    icon: <Globe className="w-10 h-10" />,
    title: 'COBERTURA',
    subtitle: 'Nacional Completa',
    description: 'Presença em todas as regiões do Brasil com unidades estrategicamente localizadas para otimizar prazos e custos.',
    color: 'gabardo'
  }
];

const ServicesFeaturesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('seguranca');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading features...</div>
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
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block"
            style={{color: '#132D51'}}
          >
            Diferenciais Gabardo
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
            <span className="text-5xl md:text-6xl lg:text-7xl font-black">6</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-widest">
              Pilares da <span style={{color: '#38B6FF'}}>Excelência</span>
            </span>
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {serviceFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setActiveItem(feature.id)}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`
                  relative p-8 md:p-10 border-2 transition-all duration-500 shadow-lg hover:shadow-2xl md:h-96 hover:cursor-pointer
                  ${getColorClasses(activeItem === feature.id)}
                `}
                style={activeItem === feature.id ? {backgroundColor: '#132D51'} : {backgroundColor: 'white'}}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                  style={activeItem === feature.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2"
                  style={activeItem === feature.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {feature.title}
                </h3>

                {/* Subtitle */}
                <div 
                  className="text-sm font-light tracking-wide uppercase mb-6 opacity-80"
                  style={activeItem === feature.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {feature.subtitle}
                </div>

                {/* Description */}
                <p 
                  className="font-light leading-relaxed text-lg"
                  style={activeItem === feature.id ? {color: 'white'} : {color: '#132D51'}}
                >
                  {feature.description}
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            Estes são os pilares que nos tornaram referência no transporte de veículos, 
            garantindo a confiança de grandes montadoras e empresas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 text-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
              style={{backgroundColor: '#38B6FF'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2da5ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38B6FF'}
            >
              Solicitar Proposta
            </button>
            <button 
              className="px-8 py-4 border-2 font-semibold uppercase tracking-wide transition-all duration-300"
              style={{borderColor: '#132D51', color: '#132D51'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#132D51';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#132D51';
              }}
            >
              Conhecer Clientes
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesFeaturesSection;
