'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Globe2, Award } from 'lucide-react';

const certifications = [
  {
    icon: ShieldCheck,
    title: 'ISO 9001',
    subtitle: 'Gestão da Qualidade',
    description:
      'Processos padronizados, auditorias recorrentes e KPIs que asseguram excelência em cada etapa da logística de veículos.',
    highlight: 'Foco na melhoria contínua',
  },
  {
    icon: Leaf,
    title: 'ISO 14001',
    subtitle: 'Gestão Ambiental',
    description:
      'Inventário de emissões desde 2017, matriz energética renovável e infraestrutura pensada para reduzir impactos ambientais.',
    highlight: 'Transportadora Carbono Neutro',
  },
  {
    icon: Globe2,
    title: 'ISO 39001',
    subtitle: 'Segurança Viária',
    description:
      'Protocolos rigorosos de segurança, central de controle 24/7 e treinamentos que garantem operações com zero avarias críticas.',
    highlight: 'Segurança viária certificada',
  },
  {
    icon: Award,
    title: 'GHG Protocol - Selo Prata',
    subtitle: 'Inventário de Emissões',
    description:
      'Transparência na gestão de gases de efeito estufa, com 100% de neutralização das emissões diretas e indiretas.',
    highlight: 'Compromisso ESG reconhecido',
  },
];

const SobreQualidadeCertificationsSection: React.FC = () => {
  return (
    <section className="relative bg-neutral-950 py-24 md:py-28 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gabardo-light-blue/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-gabardo-blue/40 blur-[220px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-gabardo-light-blue/80">Certificações e reconhecimentos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
            Padrões globais que elevam a confiança dos nossos parceiros
          </h2>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Os selos internacionais que conquistamos reforçam o compromisso da Gabardo com qualidade, sustentabilidade e
            segurança em todo o ecossistema logístico. Conheça as certificações que sustentam nossa liderança.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:border-gabardo-light-blue/50"
            >
              <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gabardo-light-blue/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gabardo-light-blue">
                  <cert.icon className="h-8 w-8" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.35em] text-white/60">{cert.subtitle}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{cert.title}</h3>
                  <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">{cert.description}</p>
                  <div className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gabardo-light-blue">
                    {cert.highlight}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreQualidadeCertificationsSection;
