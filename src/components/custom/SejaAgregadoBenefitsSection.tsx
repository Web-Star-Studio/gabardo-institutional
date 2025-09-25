'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Fuel, Wrench, Headset, LineChart } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Parceria transparente',
    description:
      'Processos claros, contratos alinhados e suporte diário para garantir uma relação de confiança em cada rota.',
  },
  {
    icon: Fuel,
    title: 'Ajuda com custos operacionais',
    description:
      'Acesso a condições especiais para combustível, pedágio e manutenção preventiva da sua frota.',
  },
  {
    icon: Wrench,
    title: 'Manutenção preventiva',
    description:
      'Orientações técnicas e parceria com oficinas homologadas para manter seus veículos sempre prontos.',
  },
  {
    icon: Headset,
    title: 'Suporte dedicado',
    description:
      'Equipe especializada acompanhando sua jornada, oferecendo respostas rápidas e apoio em imprevistos.',
  },
  {
    icon: LineChart,
    title: 'Demanda constante',
    description:
      'Rotas planejadas, operações contínuas e previsibilidade para o seu negócio crescer de forma sustentável.',
  },
];

const SejaAgregadoBenefitsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Por que ser nosso parceiro</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SejaAgregadoBenefitsSection;
