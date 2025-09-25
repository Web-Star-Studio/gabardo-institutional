'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, Truck, Clock, Users } from 'lucide-react';

const requirements = [
  {
    icon: ClipboardCheck,
    title: 'Documentação em dia',
    description:
      'CNH categoria E válida, certificados exigidos para transporte e histórico de conformidade em auditorias.',
  },
  {
    icon: Truck,
    title: 'Veículos homologados',
    description:
      'Caminhões revisados, com rastreadores instalados e compatíveis com os padrões de segurança da Gabardo.',
  },
  {
    icon: Users,
    title: 'Equipe alinhada',
    description:
      'Motoristas treinados, com cursos de direção defensiva e atendimento ao cliente atualizados.',
  },
  {
    icon: Clock,
    title: 'Pontualidade e disponibilidade',
    description:
      'Compromisso com escalas definidas, prazos de carregamento e entrega, incluindo monitoramento em tempo real.',
  },
  {
    icon: FileText,
    title: 'Processos integrados',
    description:
      'Acesso aos sistemas da Gabardo para acompanhar rotas, comprovar entregas e receber suporte diário.',
  },
];

const SejaAgregadoRequirementsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Requisitos para se tornar um agregado</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((requirement, index) => {
            const Icon = requirement.icon;

            return (
              <motion.div
                key={requirement.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{requirement.title}</h3>
                <p className="text-gray-600">{requirement.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SejaAgregadoRequirementsSection;
