'use client';

import { motion } from 'framer-motion';
import { Cpu, Satellite, LineChart, Layers, Lock } from 'lucide-react';

const innovationActions = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Telemetria avançada',
    description: 'Integração de sensores, IoT e analytics para rastrear veículos, emissões e eficiência em tempo real.'
  },
  {
    icon: <Satellite className="w-8 h-8" />,
    title: 'Operações conectadas',
    description: 'Centros de controle com dados satelitais e computação em nuvem para decisões ágeis nas rotas.'
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: 'Modelagem preditiva',
    description: 'Algoritmos que antecipam demanda, evitam ociosidade e otimizam a ocupação da frota.'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Digital twins',
    description: 'Simulações virtuais de corredores logísticos para testar cenários e reduzir emissões.'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Cibersegurança aplicada',
    description: 'Governança de dados, criptografia e protocolos de proteção para sistemas críticos e telemetria.'
  }
];

export default function InnovationHowWeActSection() {
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
          Como inovamos na logística
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovationActions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gabardo-light-blue text-white mr-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gabardo-blue">{item.title}</h3>
              </div>
              <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
