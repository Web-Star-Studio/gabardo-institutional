'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, BookOpen, Ticket, Truck } from 'lucide-react';

const benefits = [
  {
    icon: <Heart className="w-10 h-10" />,
    title: 'Apoio 24h',
    description: 'Atendimento especializado para nossos colaboradores e familiares, com apoio psicológico, de saúde, social, familiar e/ou jurídico.',
  },
  {
    icon: <Gift className="w-10 h-10" />,
    title: 'Kit Nascimento',
    description: 'Licença Maternidade e Paternidade estendidas, além de um kit especial para recém-mamães e recém-papais.',
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: 'Auxílio Escolar',
    description: 'Ajudamos na compra do kit escolar para os filhos de nossos colaboradores.',
  },
  {
    icon: <Ticket className="w-10 h-10" />,
    title: 'Clube de Descontos',
    description: 'Acesso a uma plataforma de descontos em viagens, cultura, entretenimento, serviços, gastronomia, educação e bem-estar.',
  },
  {
    icon: <Truck className="w-10 h-10" />,
    title: 'Plano de Carreira para Motoristas',
    description: 'Apoiamos nossos colaboradores que desejam mudar de categoria da carteira de habilitação, com parcelamento sem juros.',
  },
];

const TrabalheConoscoBenefitsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nossos Benefícios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoBenefitsSection;
