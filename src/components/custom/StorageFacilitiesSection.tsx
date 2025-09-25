'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Shield, Truck, CheckCircle } from 'lucide-react';

const facilities = [
  {
    icon: <Warehouse className="w-8 h-8" />,
    title: 'Galpões Modernos',
    description: 'Instalações de última geração com controle de temperatura e umidade'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Segurança 24h',
    description: 'Monitoramento constante e sistemas de segurança avançados'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Logística Integrada',
    description: 'Conexão direta com nossa frota para agilidade nas operações'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Certificações',
    description: 'Atendemos todas as normas e certificações do setor'
  }
];

export default function StorageFacilitiesSection() {
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
            Nossas Instalações
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
            Infraestrutura de
            <br />
            <span style={{ color: '#38B6FF' }}>Excelência</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed font-secondary"
          >
            Oferecemos soluções de armazenagem com a mais alta qualidade e segurança para seus veículos
          </motion.p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 p-6 md:p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
              >
                {facility.icon}
              </motion.div>

              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 font-primary" style={{ color: '#132D51' }}>
                {facility.title}
              </h3>

              <p className="text-gray-600 font-light leading-relaxed font-secondary">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
