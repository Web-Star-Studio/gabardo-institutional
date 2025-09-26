'use client';
import { motion } from 'framer-motion';
import { Zap, BarChart2, Briefcase, GitBranch, Users } from 'lucide-react';

const items = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "TECNOLOGIA E ENERGIA",
    description: "Mantemos esforços voltados para o uso eficiente de energia, ações de ecoeficiência e também através da compra de energia renovável pelo mercado livre. Mantendo nossa frota com baixa idade média, com veículos modernos e eficientes."
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: "CONTABILIZANDO",
    description: "Contabilizando, gerenciando e buscando alternativas para reduzir emissões."
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "OPORTUNIDADES",
    description: "Mapeando e incorporando riscos e oportunidades sobre a mudança do clima à estratégia de negócios da companhia. Analisando cenários e estudando ações que impactem positivamente em nossas emissões."
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: "FONTES DE EMISSÕES",
    description: "Analisamos nossas fontes de emissões que temos responsabilidade direta e indiretamente. Em nossos escopos 1, 2 e também monitorando as emissões de escopo 3. Buscamos entender a peculiaridade de cada uma de nossas operações."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "PÚBLICOS DE RELACIONAMENTO",
    description: "Envolvendo os demais públicos de relacionamento na discussão, engajando ações que visam a compensação de nossas emissões com a cadeia de valor."
  }
];

export default function HowWeActSection() {
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
          Como atuamos em relação à gestão de nossas emissões?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
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
