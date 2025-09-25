'use client';

import { motion } from 'framer-motion';
import { Users, Factory, Globe, Handshake } from 'lucide-react';

const impactMetrics = [
  {
    icon: <Users className="w-8 h-8" />,
    value: '+1.200',
    highlight: 'profissionais',
    description: 'participaram de trilhas de desenvolvimento nos últimos 3 anos',
  },
  {
    icon: <Factory className="w-8 h-8" />,
    value: '38',
    highlight: 'clientes estratégicos',
    description: 'beneficiados pelos programas de inovação logística',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: '15',
    highlight: 'cidades',
    description: 'com iniciativas sociais e educacionais apoiadas pela Gabardo',
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    value: '92%',
    highlight: 'de retenção',
    description: 'de talentos que passam pelos programas de aceleração de liderança',
  },
];

const ProgramsImpactSection = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block text-gray-600"
          >
            Resultados tangíveis
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-px bg-blue-500" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800"
          >
            Impacto real em nossa rede de valor
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.highlight}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-8 md:p-10 bg-neutral-50 border border-gray-200/80 hover:border-blue-500/50 hover:bg-blue-50/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="mb-4 text-gabardo-light-blue">
                {metric.icon}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {metric.value}
                </span>
                <span className="text-base uppercase tracking-[0.2em] text-gray-600">
                  {metric.highlight}
                </span>
              </div>
              <p className="text-lg font-light text-gray-600 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsImpactSection;
