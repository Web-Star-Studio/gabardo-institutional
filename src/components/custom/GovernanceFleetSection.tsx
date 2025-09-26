'use client';

import { motion } from 'framer-motion';

const governanceHighlights = [
  {
    value: '100%',
    label: 'processos críticos auditados anualmente'
  },
  {
    value: '12',
    label: 'políticas corporativas monitoradas em tempo real'
  },
  {
    value: '4',
    label: 'comitês de governança e compliance ativos'
  },
  {
    value: '72h',
    label: 'tempo máximo de resposta a ocorrências registradas'
  }
];

export default function GovernanceFleetSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gabardo-blue">Governança orientada por indicadores</h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed">
            Nossos frameworks de compliance asseguram rastreabilidade, controle de riscos e tomada de decisão ágil para toda a operação logística.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {governanceHighlights.map((item) => (
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
