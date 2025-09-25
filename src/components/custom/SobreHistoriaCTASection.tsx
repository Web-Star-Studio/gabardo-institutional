'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SobreHistoriaCTASection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos escrever os próximos capítulos juntos</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Entre em contato para conhecer projetos especiais, oportunidades de parceria e as próximas conquistas da Gabardo.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Fale com a Gabardo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreHistoriaCTASection;
