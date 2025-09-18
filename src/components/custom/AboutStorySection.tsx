'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Truck, Zap, Globe } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const timeline: TimelineItem[] = [
  {
    year: '1982',
    title: 'O Primeiro Passo',
    description: 'Sérgio Mário Gabardo, natural de Nova Bassano, ingressou no transporte de veículos para atender à montadora gaúcha Miura, dando início a uma trajetória de sucesso no setor.',
    icon: <Truck className="w-6 h-6" />,
    image: '/images/co-01.jpg'
  },
  {
    year: '1989',
    title: 'A Fundação',
    description: 'A Transportes Gabardo foi oficialmente fundada na capital do Rio Grande do Sul por Sérgio Mário Gabardo, estabelecendo as bases sólidas da empresa em Porto Alegre.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/co-03.jpg'
  },
  {
    year: '2000s',
    title: 'Era da Tecnologia',
    description: 'Investimento em moderna estrutura logística com sistema de rastreamento via satélite, cobrindo toda a América Latina e oferecendo gerenciamento de informações integradas em tempo real.',
    icon: <Zap className="w-6 h-6" />,
    image: '/images/co-5.jpg'
  },
  {
    year: 'Hoje',
    title: 'Liderança Continental',
    description: 'Reconhecida como uma das principais empresas do setor, com 14 unidades no Brasil e representações em 6 países do Mercosul, mantendo compromisso com segurança, qualidade e inovação.',
    icon: <Globe className="w-6 h-6" />,
    image: '/images/Grupo-49.png'
  }
];

const AboutStorySection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading story...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Nossa História
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            35 Anos de
            <br />
            <span className="text-neutral-600">Tradição e Excelência</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-amber-400 via-neutral-300 to-transparent"></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-amber-400 rounded-full z-10"></div>

                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white p-8 md:p-10 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500 ${
                      activeIndex === index ? 'border-amber-400 shadow-xl' : ''
                    }`}
                  >
                    {/* Year */}
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4"
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-3xl md:text-4xl font-bold text-red-600">
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-4">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 font-light leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Image */}
                <div className={`flex-1 mt-6 md:mt-0 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 md:mt-24"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-neutral-700 italic max-w-4xl mx-auto leading-relaxed">
            "Nossa missão é atender as necessidades de nossos clientes de forma segura, ágil e sustentável, 
            sendo referência em soluções logísticas e no transporte de veículos."
          </blockquote>
          <div className="mt-6 text-sm font-medium text-neutral-500 tracking-wide uppercase">
            — Transportes Gabardo
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStorySection; 