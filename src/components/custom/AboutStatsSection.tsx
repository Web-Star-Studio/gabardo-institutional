'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Calendar, 
  Award, 
  MapPin, 
  Coffee,
  Briefcase,
  Star
} from 'lucide-react';

interface Stat {
  id: string;
  icon: React.ReactNode;
  number: number;
  suffix: string;
  title: string;
  description: string;
  color: string;
  duration?: number;
}

const stats: Stat[] = [
  {
    id: 'units',
    icon: <Building2 className="w-8 h-8" />,
    number: 15,
    suffix: '',
    title: 'UNIDADES',
    description: 'Espaços estrategicamente localizados em Recife',
    color: 'blue',
    duration: 2000
  },
  {
    id: 'members',
    icon: <Users className="w-8 h-8" />,
    number: 5000,
    suffix: '+',
    title: 'MEMBROS ATIVOS',
    description: 'Profissionais conectados em nossa comunidade',
    color: 'amber',
    duration: 3000
  },
  {
    id: 'years',
    icon: <Calendar className="w-8 h-8" />,
    number: 12,
    suffix: '',
    title: 'ANOS DE EXPERIÊNCIA',
    description: 'Liderando o mercado de coworking no Nordeste',
    color: 'emerald',
    duration: 2500
  },
  {
    id: 'satisfaction',
    icon: <Star className="w-8 h-8" />,
    number: 98,
    suffix: '%',
    title: 'SATISFAÇÃO',
    description: 'Índice de satisfação dos nossos membros',
    color: 'purple',
    duration: 2000
  },
  {
    id: 'events',
    icon: <Award className="w-8 h-8" />,
    number: 500,
    suffix: '+',
    title: 'EVENTOS REALIZADOS',
    description: 'Networking, workshops e palestras',
    color: 'rose',
    duration: 2500
  },
  {
    id: 'cities',
    icon: <MapPin className="w-8 h-8" />,
    number: 8,
    suffix: '',
    title: 'CIDADES',
    description: 'Presença em múltiplas cidades do Nordeste',
    color: 'cyan',
    duration: 2000
  },
  {
    id: 'meetings',
    icon: <Briefcase className="w-8 h-8" />,
    number: 10000,
    suffix: '+',
    title: 'REUNIÕES REALIZADAS',
    description: 'Espaços para negócios importantes',
    color: 'indigo',
    duration: 3500
  },
  {
    id: 'coffee',
    icon: <Coffee className="w-8 h-8" />,
    number: 50000,
    suffix: '+',
    title: 'CAFÉS SERVIDOS',
    description: 'Energia para manter a produtividade',
    color: 'orange',
    duration: 4000
  }
];

// Hook para animação de contagem de todos os stats
const useCountUpStats = (stats: Stat[], isInView: boolean) => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const animationFrames: number[] = [];
    const startTimes: number[] = [];
    
    const animateAll = () => {
      stats.forEach((stat, index) => {
        const duration = stat.duration || 2000;
        
        const animate = (timestamp: number) => {
          if (!startTimes[index]) startTimes[index] = timestamp;
          const progress = Math.min((timestamp - startTimes[index]) / duration, 1);
          
          // Função de easing para suavizar a animação
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const newValue = Math.floor(stat.number * easeOutQuart);
          
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] = newValue;
            return newCounts;
          });
          
          if (progress < 1) {
            animationFrames[index] = requestAnimationFrame(animate);
          }
        };
        
        animationFrames[index] = requestAnimationFrame(animate);
      });
    };
    
    animateAll();
    
    return () => {
      animationFrames.forEach(frame => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
      });
    };
  }, [stats, isInView]);
  
  return counts;
};

const AboutStatsSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const counts = useCountUpStats(stats, isInView);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading stats...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-400',
      amber: 'text-amber-400',
      emerald: 'text-emerald-400',
      purple: 'text-purple-400',
      rose: 'text-rose-400',
      cyan: 'text-cyan-400',
      indigo: 'text-indigo-400',
      orange: 'text-orange-400'
    };
    return colors[color as keyof typeof colors];
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/20',
      amber: 'bg-amber-500/10 border-amber-500/20',
      emerald: 'bg-emerald-500/10 border-emerald-500/20',
      purple: 'bg-purple-500/10 border-purple-500/20',
      rose: 'bg-rose-500/10 border-rose-500/20',
      cyan: 'bg-cyan-500/10 border-cyan-500/20',
      indigo: 'bg-indigo-500/10 border-indigo-500/20',
      orange: 'bg-orange-500/10 border-orange-500/20'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-neutral-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
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
            className="text-sm font-light tracking-[0.2em] text-white/60 mb-4 uppercase relative inline-block"
          >
            Nossos Números
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight"
          >
            Impacto que
            <br />
            <span className="text-white/80">Transforma</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Mais de uma década construindo a maior comunidade de profissionais inovadores do Nordeste
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`
                relative p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl group
                ${getBgColorClasses(stat.color)}
              `}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(stat.color)} bg-white/10`}
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div className="mb-4">
                <motion.span 
                  className={`text-4xl md:text-5xl font-bold ${getColorClasses(stat.color)} block leading-none`}
                >
                  {Math.floor(Math.random() * 100)}
                </motion.span>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide mb-2 leading-tight">
                {stat.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 font-light leading-relaxed text-sm">
                {stat.description}
              </p>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className={`absolute bottom-0 left-0 h-1 ${getColorClasses(stat.color)} bg-current`}
              />

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-4">
              Faça Parte Desta Comunidade
            </h3>
            <p className="text-white/70 font-light text-lg leading-relaxed mb-8">
              Junte-se a milhares de profissionais que escolheram o Hub Plural para impulsionar seus negócios
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 rounded-md text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-red-700 transition-all duration-300"
            >
              Conheça Nossos Planos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStatsSection; 