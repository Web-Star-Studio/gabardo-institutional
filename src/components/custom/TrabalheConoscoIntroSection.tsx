'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrabalheConoscoIntroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Olá, somos a Gabardo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Desde 1989, temos em nosso DNA a seguinte premissa: entender as necessidades das empresas para atendê-las com qualidade e agilidade. E é pensando e agindo desta forma que nos tornamos uma referência em logística no País.
            Buscamos gente que se identifique com os nossos princípios e valores, que seja comprometida com a satisfação dos nossos clientes, que inovam, gostam de aprender e queiram evoluir aqui. Se você tem esse perfil, confira nossas vagas ou cadastre seu CV em nosso banco de talentos.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoIntroSection;
