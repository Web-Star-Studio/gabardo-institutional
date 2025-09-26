'use client';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, Award } from 'lucide-react';

const socialItems = [
  {
    icon: <Users className="w-10 h-10" />,
    title: "Desenvolvimento de Gente e Respeito à Diversidade",
    description: "Investimos no desenvolvimento de nossos colaboradores e promovemos um ambiente de trabalho inclusivo e diverso."
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Valorização do Motorista Caminhoneiro",
    description: "Reconhecemos a importância dos motoristas de caminhão e oferecemos programas de valorização e bem-estar."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Impactos em Comunidades e Investimento Social",
    description: "Contribuímos para o desenvolvimento das comunidades onde atuamos, através de projetos e investimentos sociais."
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Segurança e Integridade das Pessoas e dos Ativos",
    description: "A segurança é um valor inegociável para nós. Garantimos a integridade de nossos colaboradores e dos ativos da empresa."
  }
];

export default function SocialSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-12 text-center"
        >
          Social
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialItems.map((item, index) => (
            <motion.div
              key={index}
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
