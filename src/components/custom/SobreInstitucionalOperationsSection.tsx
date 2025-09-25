'use client';

import { motion } from 'framer-motion';

const operations = [
  {
    title: 'Planejamento estratégico',
    description:
      'Alinhamos objetivos corporativos com indicadores de desempenho, garantindo entregas consistentes para cada cliente.',
  },
  {
    title: 'Monitoramento em tempo real',
    description:
      'Centros de controle acompanham a frota 24/7, com telemetria e dashboards personalizados.',
  },
  {
    title: 'Suporte integrado',
    description:
      'Equipes de atendimento, manutenção e tecnologia agem de forma coordenada para resolver qualquer necessidade.',
  },
  {
    title: 'Melhoria contínua',
    description:
      'Programas de inovação e feedback estruturado elevam a eficiência operacional ano após ano.',
  },
];

const SobreInstitucionalOperationsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Como nossa estrutura ganha vida
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A excelência institucional da Gabardo se traduz em rotinas bem definidas, tecnologia aplicada ao dia a dia e equipes com atuação colaborativa.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {operations.map((operation, index) => (
              <motion.div
                key={operation.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {operation.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {operation.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOperationsSection;
