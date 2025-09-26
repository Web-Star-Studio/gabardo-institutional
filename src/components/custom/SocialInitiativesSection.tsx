'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { src: '/images/logo1.png', alt: 'Instituto Parceiro 1' },
  { src: '/images/logo2.png', alt: 'Instituto Parceiro 2' },
  { src: '/images/logo3.png', alt: 'Instituto Parceiro 3' },
  { src: '/images/logo4.png', alt: 'Instituto Parceiro 4' },
  { src: '/images/logo5.png', alt: 'Instituto Parceiro 5' },
  { src: '/images/logo6.png', alt: 'Instituto Parceiro 6' }
];

export default function SocialInitiativesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue">
            Parcerias sociais e compromissos
          </h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Atuamos com ONGs, institutos e associações que compartilham nossos valores para ampliar o impacto das ações sociais e garantir governança dos recursos investidos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((logo, index) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image src={logo.src} alt={logo.alt} width={150} height={80} className="mx-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
