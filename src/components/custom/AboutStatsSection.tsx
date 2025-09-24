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
    id: 'years',
    icon: <Calendar className="w-8 h-8" />,
    number: 35,
    suffix: '',
    title: 'ANOS NO MERCADO',
    description: 'Desde 1989 transportando veículos com excelência',
    color: 'gabardo',
    duration: 2000
  },
  {
    id: 'vehicles',
    icon: <Award className="w-8 h-8" />,
    number: 1400000,
    suffix: '+',
    title: 'VEÍCULOS TRANSPORTADOS',
    description: 'Milhões de veículos entregues com segurança',
    color: 'gabardo',
    duration: 3500
  },
  {
    id: 'units',
    icon: <Building2 className="w-8 h-8" />,
    number: 14,
    suffix: '',
    title: 'UNIDADES',
    description: 'Presença estratégica em todo o Brasil',
    color: 'gabardo',
    duration: 2500
  },
  {
    id: 'satisfaction',
    icon: <Star className="w-8 h-8" />,
    number: 99,
    suffix: '%',
    title: 'SATISFAÇÃO CLIENTES',
    description: 'Excelência reconhecida pelos nossos parceiros',
    color: 'gabardo',
    duration: 2000
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">Loading stats...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    return '';
  };

  const getBgColorClasses = (color: string) => {
    return 'bg-white border border-gray-200 shadow-sm hover:shadow-lg';
  };

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">

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
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block font-secondary"
            style={{ color: '#132D51' }}
          >
            Nossos Números
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{ backgroundColor: '#132D51' }}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight font-primary"
            style={{ color: '#132D51' }}
          >
            Excelência que
            <br />
            <span style={{ color: '#132D51' }}>Comprova</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed font-secondary"
          >
            Mais de três décadas liderando o transporte rodoviário de veículos no Brasil com segurança e eficiência
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
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div className="mb-4">
                <motion.span 
                  className="text-4xl md:text-5xl font-bold block leading-none font-primary"
                  style={{ color: '#132D51' }}
                >
                  {counts[index]?.toLocaleString() || 0}{stat.suffix}
                </motion.span>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide mb-2 leading-tight font-primary" style={{ color: '#132D51' }}>
                {stat.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-light leading-relaxed text-sm font-secondary">
                {stat.description}
              </p>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className="absolute bottom-0 left-0 h-1"
                style={{ backgroundColor: '#132D51' }}
              />

              {/* Hover effect overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom right, rgba(19, 45, 81, 0.05), transparent)' }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutStatsSection; 