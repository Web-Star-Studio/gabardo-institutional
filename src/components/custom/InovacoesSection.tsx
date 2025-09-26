'use client';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Zap } from 'lucide-react';

const inovacoesItems = [
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: "Soluções Personalizadas",
    description: "Desenvolvemos soluções de transporte e logística personalizadas para atender às necessidades específicas de cada cliente."
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Foco no Cliente",
    description: "Ouvimos nossos clientes para entender seus desafios e oferecer as melhores soluções, com agilidade e eficiência."
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Tecnologia de Ponta",
    description: "Investimos em tecnologia de ponta para otimizar nossos processos, aumentar a segurança e a eficiência de nossas operações."
  }
];

export default function InovacoesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-12 text-center"
        >
          Inovações
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inovacoesItems.map((item, index) => (
            <motion.div
              key={index}
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
