'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InnovationCommitmentSection() {
  return (
    <section className="relative py-32 md:py-48 bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5577.JPG"
          alt="Compromisso com inovação"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold uppercase"
        >
          15% do faturamento reinvestido em tecnologia e inovação logística.
        </motion.h2>
      </div>
    </section>
  );
}
