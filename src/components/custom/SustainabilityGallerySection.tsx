'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  '/images/gabardo-hero-01.JPG',
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/gabardo-hero-04.JPG',
  '/images/gabardo-truck-fleet.JPG',
  '/images/vintage-truck-1989.JPG',
];

const SustainabilityGallerySection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800">
            Galeria da Sustentabilidade
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={src}
                alt={`Imagem da galeria de sustentabilidade ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGallerySection;
