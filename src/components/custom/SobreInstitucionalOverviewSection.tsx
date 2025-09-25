'use client';

import { motion } from 'framer-motion';
import { Building2, Network, ShieldCheck, Cpu, Users } from 'lucide-react';

const pillars = [
  {
    icon: Building2,
    title: 'Governança corporativa',
    description:
      'Comitês executivos e diretoria atuam com processos claros, indicadores estratégicos e compliance rigoroso.',
  },
  {
    icon: Network,
    title: 'Operações integradas',
    description:
      'Centros de controle monitoram operações em tempo real, conectando unidades em todo o Brasil.',
  },
  {
    icon: ShieldCheck,
    title: 'Gestão de riscos',
    description:
      'Programas contínuos de avaliação de riscos, auditorias internas e planos de contingência.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia aplicada',
    description:
      'Sistemas próprios de gestão, telemetria embarcada e analytics para decisões orientadas por dados.',
  },
  {
    icon: Users,
    title: 'Equipe multidisciplinar',
    description:
      'Profissionais em logística, TI, jurídico e atendimento trabalhando juntos para a melhor experiência.',
  },
];

const SobreInstitucionalOverviewSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Uma empresa preparada para entregar resultados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A Gabardo une governança, infraestrutura e tecnologia para garantir que cada etapa da jornada de transporte seja executada com excelência.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOverviewSection;
