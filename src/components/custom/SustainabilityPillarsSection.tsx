'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wrench, ShieldCheck, Users } from 'lucide-react';

const pillars = [
  {
    icon: <Thermometer className="w-10 h-10" />,
    title: 'Mudanças Climáticas',
    description: 'Analisamos nossas emissões e integramos os riscos e oportunidades das mudanças climáticas em nossa estratégia de negócios.',
  },
  {
    icon: <Wrench className="w-10 h-10" />,
    title: 'Modernização da Frota',
    description: 'Nossa frota de caminhões tem idade média de 3 anos, o que reduz o impacto ambiental e aumenta a segurança e agilidade nas entregas.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: 'Segurança de Pessoas e Cargas',
    description: 'A segurança é um valor inegociável, com a gestão ativa nas rotinas operacionais para garantir um ambiente de trabalho saudável e seguro.',
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Valorização das Pessoas e Diversidade',
    description: 'Focamos em programas de inclusão e na valorização de nossos colaboradores, promovendo o respeito à diversidade.',
  },
];

const SustainabilityPillarsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800"
          >
            Nossos Pilares de Atuação
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="mr-6 text-blue-600">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{pillar.title}</h3>
                  <p className="text-lg text-gray-600">{pillar.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPillarsSection;
