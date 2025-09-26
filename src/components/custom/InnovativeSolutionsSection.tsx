'use client';
import { motion } from 'framer-motion';

export default function InnovativeSolutionsSection() {
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
          Soluções Inovadoras e com Foco no Cliente
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 font-light leading-relaxed max-w-4xl mx-auto"
        >
          Estamos espalhados por diversos municípios do País e, com essa capilaridade, sabemos da responsabilidade e dos desafios de estarmos em conformidade com as questões ambientais nos itens mais básicos do processo, mas também buscando no mercado alternativas que solucionem pontos críticos que possam existir nas operações dos clientes e para os nossos clientes.
        </motion.p>
      </div>
    </section>
  );
}
