'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Lightbulb, 
  Leaf, 
  Award, 
  Heart, 
  HandHeart,
  Zap,
  Globe2
} from 'lucide-react';

interface Value {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
  image: string;
}

const values: Value[] = [
  {
    id: 'collaboration',
    icon: <Users className="w-8 h-8" />,
    title: 'COLABORAÇÃO',
    description: 'Acreditamos no poder da colaboração e na força da comunidade para criar soluções inovadoras.',
    details: [
      'Espaços projetados para interação',
      'Eventos de networking regulares',
      'Programas de mentoria',
      'Comunidade ativa e engajada'
    ],
    color: 'blue',
    image: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-01.png'
  },
  {
    id: 'innovation',
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'INOVAÇÃO',
    description: 'Sempre buscamos novas formas de melhorar e evoluir, mantendo-nos na vanguarda do mercado.',
    details: [
      'Tecnologia de ponta',
      'Soluções criativas',
      'Ambientes inspiradores',
      'Cultura de experimentação'
    ],
    color: 'amber',
    image: 'https://hubplural.com/wp-content/uploads/2023/09/PASSAPORTE-02-1024x770.png'
  },
  {
    id: 'sustainability',
    icon: <Leaf className="w-8 h-8" />,
    title: 'SUSTENTABILIDADE',
    description: 'Compromisso com práticas sustentáveis e responsabilidade ambiental em todas as nossas operações.',
    details: [
      'Energia renovável',
      'Reciclagem e reutilização',
      'Construção verde',
      'Impacto ambiental reduzido'
    ],
    color: 'emerald',
    image: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-02.png'
  },
  {
    id: 'excellence',
    icon: <Award className="w-8 h-8" />,
    title: 'EXCELÊNCIA',
    description: 'Padrão de qualidade superior em todos os aspectos, desde infraestrutura até atendimento.',
    details: [
      'Qualidade premium',
      'Atendimento personalizado',
      'Melhoria contínua',
      'Satisfação do cliente'
    ],
    color: 'purple',
    image: 'https://hubplural.com/wp-content/uploads/2025/05/Captura-de-tela-2025-05-09-220312.png'
  }
];

const culturePoints = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Diversidade e Inclusão',
    description: 'Celebramos a diversidade e promovemos um ambiente inclusivo para todos'
  },
  {
    icon: <HandHeart className="w-6 h-6" />,
    title: 'Impacto Social',
    description: 'Contribuímos para o desenvolvimento da comunidade local e economia criativa'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Agilidade',
    description: 'Adaptabilidade e rapidez para responder às necessidades em constante mudança'
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: 'Visão Global',
    description: 'Perspectiva internacional com raízes locais fortes e conectadas'
  }
];

const AboutValuesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeValue, setActiveValue] = useState<string>('collaboration');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading values...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-50 border-blue-200 hover:border-blue-500',
      amber: 'text-amber-500 bg-amber-50 border-amber-200 hover:border-amber-500',
      emerald: 'text-emerald-500 bg-emerald-50 border-emerald-200 hover:border-emerald-500',
      purple: 'text-purple-500 bg-purple-50 border-purple-200 hover:border-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  const getActiveColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white border-blue-500',
      amber: 'bg-amber-500 text-white border-amber-500',
      emerald: 'bg-emerald-500 text-white border-emerald-500',
      purple: 'bg-purple-500 text-white border-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  const activeValueData = values.find(v => v.id === activeValue) || values[0];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Nossa Cultura
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Valores que nos
            <br />
            <span className="text-neutral-600">Definem</span>
          </motion.h2>
        </motion.div>

        {/* Values Interactive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Values Navigation */}
          <div className="space-y-4">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveValue(value.id)}
                className={`
                  cursor-pointer p-6 border-2 transition-all duration-500
                  ${activeValue === value.id 
                    ? getActiveColorClasses(value.color) 
                    : getColorClasses(value.color)
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {value.icon}
                  </motion.div>
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-2">
                      {value.title}
                    </h3>
                    <p className="font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Value Details */}
          <motion.div
            key={activeValue}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Image */}
            <div className="relative overflow-hidden shadow-xl">
              <motion.img
                layoutId="value-image"
                src={activeValueData.image}
                alt={activeValueData.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-50 p-6 md:p-8"
            >
              <h4 className="text-2xl font-bold text-black uppercase tracking-wide mb-4">
                Como Aplicamos
              </h4>
              <ul className="space-y-3">
                {activeValueData.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center text-neutral-700"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></div>
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutValuesSection; 