'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Daniele Gomes Gonçalves',
    role: 'Coordenadora Administrativa',
    quote: 'A JSL é uma escola e fico feliz em aprender a cada dia. Hoje atuo como coordenadora de uma grande filial e sou exemplo de que, com muita dedicação e respeito às pessoas, é possível chegar onde se quer.',
    image: '/images/co-01.jpg', // Placeholder image
  },
  {
    name: 'Waldir Alves de Souza',
    role: 'Gerente de Filial',
    quote: 'Meu trabalho na JSL iniciou em 1972. O desafio foi tão bom que estou há mais de 40 anos na Bahia, trabalhando pela empresa, crescendo junto com a filial e atuando no transporte e operações das principais indústrias do estado.',
    image: '/images/co-2.jpg', // Placeholder image
  },
  {
    name: 'Ercio Gomes da Silva',
    role: 'Coordenador de Treinamento Operacional',
    quote: 'Posso dizer que estou sempre engajado e tenho como princípio as crenças e objetivos da empresa, que me motivam a ser um profissional diferenciado. Sentindo paixão pelo que faço no meu dia a dia.',
    image: '/images/co-03.jpg', // Placeholder image
  },
];

const TrabalheConoscoTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">O que nossa gente diz</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoTestimonialsSection;
