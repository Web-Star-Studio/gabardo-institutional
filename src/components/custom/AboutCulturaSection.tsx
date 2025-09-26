
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  HandHeart,
  Zap,
  Globe2
} from 'lucide-react';

const culturePoints = [
  {
    icon: <Heart className="w-8 h-8 text-gabardo-blue" />,
    title: 'Diversidade e Inclusão',
    description: 'Celebramos a diversidade e promovemos um ambiente inclusivo para todos'
  },
  {
    icon: <HandHeart className="w-8 h-8 text-gabardo-light-blue" />,
    title: 'Impacto Social',
    description: 'Contribuímos para o desenvolvimento da comunidade local e economia criativa'
  },
  {
    icon: <Zap className="w-8 h-8 text-gabardo-blue-700" />,
    title: 'Agilidade',
    description: 'Adaptabilidade e rapidez para responder às necessidades em constante mudança'
  },
  {
    icon: <Globe2 className="w-8 h-8 text-gabardo-light-blue-500" />,
    title: 'Visão Global',
    description: 'Perspectiva internacional com raízes locais fortes e conectadas'
  }
];

const AboutCulturaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 uppercase tracking-tight">
            Nossa Cultura
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Os pilares que sustentam nosso sucesso.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culturePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                {point.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCulturaSection;
