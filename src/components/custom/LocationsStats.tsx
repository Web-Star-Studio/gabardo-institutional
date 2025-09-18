'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/animated-counter';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  description: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    label: 'Cidades',
    value: 8,
    description: 'Presentes em todo o Nordeste',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
        <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
      </svg>
    )
  },
  {
    label: 'Estados',
    value: 3,
    description: 'Expandindo nossa presença',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
        <path d="M9 9h6v6H9z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
      </svg>
    )
  },
  {
    label: 'Anos',
    value: 15,
    suffix: '+',
    description: 'De experiência e confiança',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
        <path d="M12 7v5l3 3M12 12h6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
      </svg>
    )
  },
  {
    label: 'Colaboradores',
    value: 250,
    suffix: '+',
    description: 'Profissionais qualificados',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="6" height="6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
        <rect x="15" y="3" width="6" height="6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
        <rect x="9" y="15" width="6" height="6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
      </svg>
    )
  }
];

const LocationsStats: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            nossa expansão
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Números que refletem nosso crescimento e compromisso com a excelência
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 transform group-hover:scale-110 transition-transform duration-500" />
                
                {/* Icon Container */}
                <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-500">
                  {stat.icon}
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index * 0.5) + 1
                  }}
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full"
                />
              </div>

              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-neutral-800">
                  <AnimatedCounter
                    value={stat.value}
                    duration={2000}
                  />
                  {stat.suffix && <span className="text-neutral-600">{stat.suffix}</span>}
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-700 uppercase tracking-wide">
                  {stat.label}
                </h3>
                
                <p className="text-neutral-500 text-sm leading-relaxed max-w-48 mx-auto">
                  {stat.description}
                </p>
              </div>

              {/* Hover Effect Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: (index * 0.1) + 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mt-4"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-neutral-100 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <span className="text-neutral-600 font-medium">
              E ainda estamos crescendo...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationsStats; 