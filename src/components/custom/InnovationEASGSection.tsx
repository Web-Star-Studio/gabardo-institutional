'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const innovationLevers = [
  'Laboratório de inovação logística com squads multidisciplinares',
  'Parcerias com startups e universidades para novos modais',
  'Investimentos em energia limpa e biocombustíveis para a frota',
  'Projetos piloto de veículos autônomos e elétricos',
  'Plataformas digitais que conectam colaboradores, clientes e motoristas',
  'KPIs de inovação alinhados à agenda ESG e ao planejamento estratégico'
];

export default function InnovationEASGSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5193.JPG"
          alt="Hub de inovação Gabardo"
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
              Agenda de inovação integrada
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-200 font-light leading-relaxed mb-6"
            >
              Estruturamos um portfólio contínuo de inovação com governança dedicada, mapeamento de tendências e priorização de projetos de alto impacto operacional e ambiental.
            </motion.p>
            <ul className="space-y-2 text-gray-100">
              {innovationLevers.map((item, index) => (
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
