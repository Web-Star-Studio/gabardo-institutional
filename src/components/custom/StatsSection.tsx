'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { number: '500+', label: 'Empresas Transformadas', description: 'Crescimento comprovado', type: 'text' },
              { number: '98%', label: 'Taxa de Satisfação', description: 'Clientes recomendam', type: 'text' },
              { number: '24/7', label: 'Suporte Disponível', description: 'Sempre aqui para você', type: 'text' },
              { number: '5.0', label: 'Avaliação Média', description: 'Excelência reconhecida', type: 'star' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-black text-black mb-2 group-hover:text-secondary transition-colors duration-300 flex items-center justify-center gap-2">
                  {stat.number}
                  {stat.type === 'star' && (
                    <Star className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 stroke-2" />
                  )}
                </div>
                <div className="text-lg font-bold text-black mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-neutral-500 font-light">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
