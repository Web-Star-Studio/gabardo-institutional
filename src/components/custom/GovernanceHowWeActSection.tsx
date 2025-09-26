'use client';

import { motion } from 'framer-motion';
import { Shield, Scale, FileCheck, Users, Workflow } from 'lucide-react';

const governanceActions = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Programa de integridade',
    description: 'Políticas anticorrupção, canais de denúncia e auditorias independentes reforçam a ética em nossas operações.'
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: 'Compliance regulatório',
    description: 'Monitoramento contínuo de legislação, LGPD e normas ANTT com time jurídico dedicado.'
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: 'Gestão de riscos',
    description: 'Mapeamento corporativo de riscos com planos de contingência, matrizes de impacto e indicadores de governança.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Conselhos e comitês',
    description: 'Estrutura de governança com comitês ESG, financeiro e de pessoas, garantindo decisões colegiadas.'
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: 'Padronização de processos',
    description: 'Metodologias e manuais corporativos asseguram consistência nas operações e na prestação de contas.'
  }
];

export default function GovernanceHowWeActSection() {
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
          Como garantimos governança sólida
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {governanceActions.map((item, index) => (
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
