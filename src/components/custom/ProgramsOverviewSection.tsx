'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, HeartHandshake } from 'lucide-react';

const programs = [
  {
    icon: <GraduationCap className="w-10 h-10" />,
    title: 'Academia Gabardo',
    description:
      'Trilhas contínuas de aprendizado para todos os níveis, com foco em operações logísticas, liderança e excelência no atendimento ao cliente.',
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: 'Hub de Inovação',
    description:
      'Laboratórios colaborativos que conectam times multidisciplinares para testar soluções digitais, otimizar a frota e ampliar a eficiência operacional.',
  },
  {
    icon: <HeartHandshake className="w-10 h-10" />,
    title: 'Impacto Social',
    description:
      'Programas voltados à comunidade, com capacitação de jovens, ações de voluntariado e apoio a iniciativas de educação no trânsito.',
  },
];

const ProgramsOverviewSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block text-gray-600"
          >
            Programas Estruturantes
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-px bg-blue-500" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800"
          >
            Desenvolvemos Pessoas, Processos e Comunidades
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl font-light text-gray-600 max-w-3xl mx-auto"
          >
            Os programas corporativos da Gabardo criam uma jornada completa de desenvolvimento, combinando capacitação técnica, formação de lideranças e ações sociais que refletem nosso compromisso com a sustentabilidade.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 md:p-10 border-2 border-gray-200/80 hover:border-blue-500/60 transition-all duration-300 shadow-lg hover:shadow-xl bg-white">
                <div className="mb-6 text-blue-600">
                  {program.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-3 text-gray-800">
                  {program.title}
                </h3>
                <p className="font-light leading-relaxed text-lg text-gray-600">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverviewSection;
