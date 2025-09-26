'use client';

import { motion } from 'framer-motion';

const innovationMetrics = [
  {
    value: '35%',
    label: 'redução de tempo de rota com algoritmos de otimização'
  },
  {
    value: '180',
    label: 'projetos de melhoria contínua ativos em 2024'
  },
  {
    value: '100%',
    label: 'frota conectada com telemetria e IoT'
  },
  {
    value: '20%',
    label: 'parcerias com startups e universidades em P&D'
  }
];

export default function InnovationFleetSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gabardo-blue">Métricas de inovação logística</h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed">
            Monitoramos indicadores que conectam eficiência operacional, sustentabilidade e tecnologia para acelerar transformações na Gabardo.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {innovationMetrics.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_35px_-28px_rgba(19,45,81,0.35)]"
            >
              <div className="text-2xl md:text-3xl font-bold text-gabardo-blue">{item.value}</div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
