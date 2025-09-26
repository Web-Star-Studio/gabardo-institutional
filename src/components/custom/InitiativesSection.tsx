'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  { src: '/images/logo1.png', alt: 'Logo 1' },
  { src: '/images/logo2.png', alt: 'Logo 2' },
  { src: '/images/logo3.png', alt: 'Logo 3' },
  { src: '/images/logo4.png', alt: 'Logo 4' },
  { src: '/images/logo5.png', alt: 'Logo 5' },
  { src: '/images/logo6.png', alt: 'Logo 6' },
];

export default function InitiativesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-12 text-center"
        >
          Iniciativas e Compromissos
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
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
