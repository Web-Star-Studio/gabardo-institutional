'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Shield, MapPin } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 'transporte-veiculos',
    title: 'Transporte de Veículos',
    description: 'Transporte especializado de veículos nacionais e importados com máxima segurança e agilidade.',
    features: [
      'Frota própria e terceirizada',
      'Rastreamento em tempo real',
      'Seguro total dos veículos',
      'Cobertura nacional'
    ],
    icon: <Truck className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5818.JPG'
  },
  {
    id: 'transporte-prancha',
    title: 'Transporte em Prancha',
    description: 'Soluções especializadas para transporte de veículos pesados, máquinas e equipamentos.',
    features: [
      'Pranchas especializadas',
      'Equipe técnica qualificada',
      'Cargas excepcionais',
      'Logística personalizada'
    ],
    icon: <Package className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
  },
  {
    id: 'armazenagem',
    title: 'Armazenagem',
    description: 'Pátios seguros e estrategicamente localizados para armazenamento de veículos.',
    features: [
      'Pátios certificados',
      'Segurança 24h',
      'Gestão de estoque',
      'Localização estratégica'
    ],
    icon: <Shield className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5388.JPG'
  },
  {
    id: 'logistica-integrada',
    title: 'Logística Integrada',
    description: 'Soluções completas de logística automotiva com gestão end-to-end.',
    features: [
      'Gestão de frotas',
      'Otimização de rotas',
      'KPIs auditáveis',
      'Relatórios personalizados'
    ],
    icon: <MapPin className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  }
];

const ServicesOverviewSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
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
            Nossos Serviços
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Operações Exclusivas e</span>
            <br />
            <span className="text-neutral-600">Equipe Especializada</span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className={`bg-white border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden`}
                style={activeIndex === index ? {borderColor: '#38B6FF'} : {}}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: '#132D51'}}>
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4" style={{color: '#132D51'}}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#38B6FF'}}></div>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                    className="mt-6 h-1"
                    style={{backgroundColor: '#38B6FF'}}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Operational Excellence Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 md:mt-24 bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center uppercase tracking-wide">
              Excelência Operacional que Faz a Diferença
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase">Operações Especializadas</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Operações dedicadas exclusivas para cada cliente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Equipe especializada para minimizar impactos operacionais</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Operações com transit-point e cross docking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Milk run e consolidação de cargas otimizada</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase">Tecnologia e Inovação</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Central própria de rastreamento de veículos</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Suporte em tempo real das operações 24/7</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sistemas de gestão integrada e relatórios personalizados</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Parcerias estratégicas com milhares de agregados</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center bg-white/10 p-6 rounded-xl">
              <p className="text-lg mb-6 font-light">
                Somos reconhecidos por proporcionar <strong>ganhos de escala</strong> e <strong>redução de custos</strong> 
                com retorno vazio otimizado para nossos parceiros. Nossa excelência operacional foi conquistada 
                focando na satisfação de cada cliente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-10 py-4 bg-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
                  Faça Seu Orçamento
                </button>
                <button 
                  className="px-10 py-4 border-2 border-white text-white font-semibold uppercase tracking-wide transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#132D51';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Conhecer Operações
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
