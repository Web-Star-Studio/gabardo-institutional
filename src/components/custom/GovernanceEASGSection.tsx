'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const governancePillars = [
  'Conselho consultivo com representatividade multidisciplinar',
  'Políticas corporativas revisadas anualmente e aprovadas pelo board',
  'Controles internos e auditorias independentes para processos críticos',
  'Compliance e LGPD com treinamentos obrigatórios e certificações',
  'Canal de ética 100% anônimo e monitorado por empresa externa',
  'Relatórios periódicos para stakeholders e transparência de indicadores'
];

export default function GovernanceEASGSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5605.JPG"
          alt="Estrutura de governança Gabardo"
          fill
          className="object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-black/50 p-8 rounded-3xl backdrop-blur-sm">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold uppercase text-white mb-6"
            >
              Estrutura de governança integrada
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-200 font-light leading-relaxed mb-6"
            >
              Com uma agenda robusta ESG, dedicamos comitês e ferramentas de compliance para garantir transparência, mitigação de riscos e sustentabilidade de longo prazo.
            </motion.p>
            <ul className="space-y-2 text-gray-100">
              {governancePillars.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gabardo-light-blue" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
}
