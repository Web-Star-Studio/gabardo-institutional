'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, Settings } from 'lucide-react';

const services = [
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Armazenagem de Veículos',
    description: 'Guarda segura de veículos novos e usados com controle rigoroso de entrada e saída',
    features: ['Controle de temperatura', 'Proteção contra intempéries', 'Organização por categoria']
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Gestão de Estoque',
    description: 'Sistema integrado para controle e rastreamento de todos os veículos armazenados',
    features: ['Relatórios em tempo real', 'Histórico completo', 'Alertas automáticos']
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Logística Integrada',
    description: 'Conexão direta com nossa frota para movimentação rápida e eficiente',
    features: ['Agendamento flexível', 'Rastreamento GPS', 'Entrega programada']
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: 'Serviços Complementares',
    description: 'Lavagem, manutenção básica e preparação dos veículos quando necessário',
    features: ['Lavagem e enceramento', 'Inspeção técnica', 'Documentação']
  }
];

export default function StorageServicesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block font-secondary"
            style={{ color: '#132D51' }}
          >
            Nossos Serviços
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{ backgroundColor: '#132D51' }}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight font-primary"
            style={{ color: '#132D51' }}
          >
            Soluções Completas em
            <br />
            <span style={{ color: '#38B6FF' }}>Armazenagem</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed font-secondary"
          >
            Oferecemos um portfólio completo de serviços para atender todas as necessidades de armazenagem de veículos
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-50 p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
              >
                {service.icon}
              </motion.div>

              <h3 className="text-2xl font-bold uppercase tracking-wide mb-4 font-primary" style={{ color: '#132D51' }}>
                {service.title}
              </h3>

              <p className="text-gray-700 font-light leading-relaxed mb-6 font-secondary">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 font-secondary">
                    <div 
                      className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#38B6FF' }}
                    ></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
