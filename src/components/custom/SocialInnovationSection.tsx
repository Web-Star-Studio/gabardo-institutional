'use client';

import { motion } from 'framer-motion';

export default function SocialInnovationSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-6"
        >
          Programas sociais que geram valor compartilhado
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 font-light leading-relaxed max-w-4xl mx-auto"
        >
          Aceleramos iniciativas de voluntariado corporativo, bolsas de estudo e apoio psicossocial integradas ao nosso planejamento ESG. As áreas de RH, ESG e Operações atuam juntas para ampliar impacto, mensurar resultados e adaptar o portfólio às necessidades das comunidades em cada base.
        </motion.p>
      </div>
    </section>
  );
}
