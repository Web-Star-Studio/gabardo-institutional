'use client';

import { motion } from 'framer-motion';

const SejaAgregadoIntroSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Um convite para crescer com a Gabardo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Buscamos parceiros comprometidos com excelência operacional, cumprimento de prazos e cuidado com cada carga. Como agregado Gabardo, você se conecta a uma operação que oferece rotas consistentes, suporte dedicado e reconhecimento pela sua entrega.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SejaAgregadoIntroSection;
