'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Users, TrendingUp } from 'lucide-react';

const commitmentItems = [
  {
    icon: <Leaf className="w-10 h-10" />,
    title: 'Ambiental',
    description: 'Focamos no uso eficiente de energia, ações de ecoeficiência e uma frota moderna para reduzir emissões.',
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: 'Social',
    description: 'Valorizamos nossa gente com programas inclusivos, promovendo a diversidade e o respeito em nosso ambiente de trabalho.',
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Governança',
    description: 'Nosso modelo de governança preza pela transparência, ética e conformidade, seguindo as melhores práticas do mercado.',
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    title: 'Econômico',
    description: 'Integramos a sustentabilidade em nossa estratégia de negócios para um crescimento sólido e responsável.',
  },
];

const SustainabilityCommitmentSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
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
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block text-gray-600"
          >
            Nosso Compromisso
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-blue-500"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800"
          >
            Crescimento Sustentável
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitmentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 md:p-10 border-2 border-gray-200/80 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl bg-white hover:bg-blue-50/20">
                <div className="mb-6 text-blue-600">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="font-light leading-relaxed text-lg text-gray-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitmentSection;
