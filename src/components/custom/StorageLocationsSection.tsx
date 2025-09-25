'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const locations = [
  {
    city: 'São Paulo',
    region: 'SP - Matriz',
    address: 'Rua Industrial, 1500 - Vila Industrial',
    phone: '(11) 3456-7890',
    capacity: '5.000 veículos',
    hours: 'Seg-Sex: 7h-19h | Sáb: 7h-12h'
  },
  {
    city: 'Rio de Janeiro',
    region: 'RJ',
    address: 'Av. Brasil, 2800 - Zona Portuária',
    phone: '(21) 3456-7890',
    capacity: '3.500 veículos',
    hours: 'Seg-Sex: 7h-19h | Sáb: 7h-12h'
  },
  {
    city: 'Belo Horizonte',
    region: 'MG',
    address: 'Rua da Logística, 800 - Distrito Industrial',
    phone: '(31) 3456-7890',
    capacity: '2.800 veículos',
    hours: 'Seg-Sex: 7h-19h | Sáb: 7h-12h'
  },
  {
    city: 'Porto Alegre',
    region: 'RS',
    address: 'Av. Logística, 1200 - Zona Sul',
    phone: '(51) 3456-7890',
    capacity: '2.200 veículos',
    hours: 'Seg-Sex: 7h-19h | Sáb: 7h-12h'
  }
];

export default function StorageLocationsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
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
            Nossas Unidades
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
            Presença
            <br />
            <span style={{ color: '#38B6FF' }}>Nacional</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed font-secondary"
          >
            Unidades estrategicamente localizadas nas principais regiões do Brasil para melhor atender nossos clientes
          </motion.p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide font-primary" style={{ color: '#132D51' }}>
                    {location.city}
                  </h3>
                  <p className="text-lg font-medium font-secondary" style={{ color: '#38B6FF' }}>
                    {location.region}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
                >
                  <MapPin className="w-6 h-6" />
                </motion.div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#132D51' }} />
                  <div>
                    <p className="font-medium font-secondary" style={{ color: '#132D51' }}>
                      Endereço
                    </p>
                    <p className="text-gray-600 font-secondary">
                      {location.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#132D51' }} />
                  <div>
                    <p className="font-medium font-secondary" style={{ color: '#132D51' }}>
                      Telefone
                    </p>
                    <p className="text-gray-600 font-secondary">
                      {location.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#132D51' }} />
                  <div>
                    <p className="font-medium font-secondary" style={{ color: '#132D51' }}>
                      Horário de Funcionamento
                    </p>
                    <p className="text-gray-600 font-secondary">
                      {location.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capacity Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium font-secondary"
                     style={{ backgroundColor: 'rgba(56, 182, 255, 0.1)', color: '#132D51' }}>
                  Capacidade: {location.capacity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
