'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const ProgramsCTASection = () => {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_#60a5fa_0%,_transparent_55%)]" />
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-light tracking-[0.3em] uppercase text-gabardo-light-blue"
          >
            Evolua com a Gabardo
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            Conecte seu time aos nossos programas
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl font-light text-gray-100"
          >
            Conte com uma estrutura completa de desenvolvimento, inovação e impacto social para impulsionar talentos e gerar novos resultados para sua operação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contato"
              className="px-8 py-4 bg-white text-blue-900 font-semibold uppercase tracking-[0.25em] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Falar com especialistas
            </Link>
            <Link
              href="/trabalhe-conosco"
              className="px-8 py-4 bg-transparent border border-white/40 text-white font-semibold uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Participar como talento
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsCTASection;
