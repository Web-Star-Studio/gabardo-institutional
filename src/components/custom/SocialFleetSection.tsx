'use client';

import { motion } from 'framer-motion';

const highlights = [
  {
    value: '+12 mil',
    label: 'horas de treinamento social e comportamental por ano'
  },
  {
    value: '24/7',
    label: 'centros de apoio ao motorista e familiares'
  },
  {
    value: '30+',
    label: 'cidades com programas comunitários ativos'
  },
  {
    value: 'R$ 3 mi',
    label: 'investidos em iniciativas sociais e de bem-estar em 2024'
  }
];

export default function SocialFleetSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gabardo-blue">Rede de cuidado com nossas pessoas</h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed">
            Programas integrados garantem suporte humano, desenvolvimento de carreira e benefícios que acompanham as famílias dos colaboradores e motoristas Gabardo.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
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
