'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InnovationClimateSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-6"
            >
              Inovação e tecnologia sustentável
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 font-light leading-relaxed"
            >
              Investimos em soluções digitais, automação e análise de dados para reduzir emissões, otimizar rotas e elevar a eficiência energética de toda a cadeia logística.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/images/Trans Gabardo - Framers produtora -5475.JPG"
              alt="Tecnologia Gabardo"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
