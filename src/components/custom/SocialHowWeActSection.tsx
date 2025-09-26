'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, HeartHandshake, Headset, ShieldCheck } from 'lucide-react';

const items = [
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Cultura centrada em pessoas',
    description:
      'Programas contínuos de clima, escuta ativa e reconhecimento que fortalecem o engajamento e a permanência do nosso time em todo o Brasil.'
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Academia Gabardo',
    description:
      'Capacitação técnica e comportamental para colaboradores e motoristas, com trilhas de aprendizagem, simuladores e acompanhamento de performance.'
  },
  {
    icon: <HeartHandshake className="w-8 h-8" />,
    title: 'Parcerias comunitárias',
    description:
      'Projetos sociais em municípios estratégicos apoiando educação, saúde e geração de renda nas comunidades onde operamos.'
  },
  {
    icon: <Headset className="w-8 h-8" />,
    title: 'Suporte ao motorista agregado',
    description:
      'Centros de atendimento 24/7, assistência jurídica e programas de orientação financeira para nossos parceiros de estrada.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Saúde e segurança ocupacional',
    description:
      'Protocolos atualizados de segurança, exames periódicos e campanhas de bem-estar físico e mental para colaboradores e famílias.'
  }
];

export default function SocialHowWeActSection() {
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
          Como cuidamos das pessoas e comunidades
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
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
