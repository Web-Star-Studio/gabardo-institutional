
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type CardFront =
  | {
      type: 'blank';
    }
  | {
      type: 'logo';
      src: string;
      alt: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
    };

type Card = {
  id: string;
  front: CardFront;
  back: {
    title: string;
    description: string;
  };
};

const cards: Card[] = [
  {
    id: 'volkswagen',
    front: {
      type: 'blank'
    },
    back: {
      title: 'Volkswagen',
      description:
        'Distribuição nacional de veículos e peças com rastreabilidade completa e janelas de entrega otimizadas.'
    }
  },
  {
    id: 'mercedes-benz',
    front: {
      type: 'blank'
    },
    back: {
      title: 'Mercedes-Benz',
      description:
        'Operações premium de transporte dedicado, garantindo SLA rigoroso para linhas de veículos comerciais e luxo.'
    }
  },
  {
    id: 'ford',
    front: {
      type: 'blank'
    },
    back: {
      title: 'Ford',
      description:
        'Gestão integrada de pátios e transferências interestaduais com controle de estoque dinâmico.'
    }
  },
  {
    id: 'scania',
    front: {
      type: 'blank'
    },
    back: {
      title: 'Scania',
      description:
        'Planos logísticos para veículos pesados com monitoramento em tempo real e suporte técnico especializado.'
    }
  },
  {
    id: 'localiza',
    front: {
      type: 'blank'
    },
    back: {
      title: 'Localiza',
      description:
        'Rede de relocação e abastecimento de frotas com processos padronizados e alto giro de veículos.'
    }
  },
  {
    id: 'jsl',
    front: {
      type: 'blank'
    },
    back: {
      title: 'JSL',
      description:
        'Parceria estratégica em operações complexas de multimodalidade e projetos especiais de logística.'
    }
  }
];

const backGradients = [
  'from-gabardo-blue to-gabardo-light-blue',
  'from-gabardo-blue to-blue-500',
  'from-blue-900 to-gabardo-blue',
  'from-blue-800 to-blue-400',
  'from-gabardo-blue-900 to-gabardo-light-blue-400',
  'from-slate-800 to-gabardo-blue'
];

const AboutClientsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 uppercase tracking-tight">
            Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Confiança e parceria que nos movem.
          </p>
          <p className="text-sm uppercase tracking-[0.35em] text-gabardo-blue mt-6">Trusted by</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="group [perspective:1400px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
            >
              <div className="relative w-full aspect-square rounded-3xl shadow-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
                <div
                  className={`absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-gray-100 p-6 [backface-visibility:hidden]`}
                >
                  {card.front.type === 'blank' ? (
                    <div className="h-full w-full rounded-2xl border-2 border-dashed border-gabardo-blue/20 bg-white/40" />
                  ) : card.front.type === 'image' ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={card.front.src}
                        alt={card.front.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={card.front.src}
                        alt={card.front.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                <div
                  className={`absolute inset-0 flex h-full w-full flex-col justify-center space-y-3 rounded-3xl bg-gradient-to-br ${backGradients[index % backGradients.length]} px-8 text-left text-white [backface-visibility:hidden] [transform:rotateX(180deg)]`}
                >
                  <h3 className="text-xl font-semibold">
                    {card.back.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    {card.back.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClientsSection;
