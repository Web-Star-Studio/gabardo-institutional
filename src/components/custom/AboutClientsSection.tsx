
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutClientsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 uppercase tracking-tight">
            Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Confiança e parceria que nos movem.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <Image
            src="/images/gabardo-clients-logos.png"
            alt="Gabardo Clients"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClientsSection;
