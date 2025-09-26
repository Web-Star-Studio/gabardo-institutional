'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InfiniteScroll from '@/components/InfiniteScroll';
import { Building, Users, Truck, Target } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const timeline: TimelineItem[] = [
  {
    year: '1989',
    title: 'Fundação da Transportes Gabardo',
    description: 'A Transportes Gabardo foi fundada em Porto Alegre, capital do Rio Grande do Sul, por Sérgio Mário Gabardo.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/vintage-truck-1989.JPG'
  },
  {
    year: '1994-1998',
    title: 'Primeiras Expansões',
    description: '1994: Aquisição da unidade Cariacica/ES, próxima ao Porto de Vitória. 1998: Criação das unidades São Bernardo do Campo/SP e São José dos Pinhais/PR.',
    icon: <Truck className="w-6 h-6" />,
    image: '/images/gabardo-truck-fleet.JPG'
  },
  {
    year: '2001-2004',
    title: 'Expansão no Sudeste e Certificação',
    description: '2001: Unidade Duque de Caxias/RJ. 2003: Início das operações em Porto Real/RJ. 2004: Processo de certificação ISO 9001:2000 sob coordenação de Mário Sérgio Gabardo (in memoriam).',
    icon: <Target className="w-6 h-6" />,
    image: '/images/gabardo-certification-docs.JPG'
  },
  {
    year: '2008-2012',
    title: 'Consolidação Nacional',
    description: '2008: Renovação do contrato CAOA Hyundai por 30 anos e inauguração da unidade Anápolis/GO (1.200.000m²). 2009: Aquisição de pátios Jaraguá/SP. 2012: Contrato GLOVIS/Hyundai Piracicaba e operação das unidades Palhoça/SC e Eusébio/CE.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5818.JPG'
  },
  {
    year: '2014-2018',
    title: 'Modernização e Crescimento',
    description: '2014: Reformulação Porto Alegre e inauguração Chuí/RS. 2015: Certificação ISO 9001:2008 Piracicaba. 2016-2017: Expansões Eusébio/CE, Mogi das Cruzes/SP. 2018: ISO 9001:2015, restaurante Porto Alegre, operação Jacareí/SP.',
    icon: <Target className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5388.JPG'
  },
  {
    year: '2019-2021',
    title: '30 Anos e Reconhecimento',
    description: '2019: 30 anos de mercado. 2020: ISO 14001 e ISO 39001, parceria CHILDHOOD, Projeto PESCAR, Prêmio CAOA CHERY. 2021: Segundo Prêmio CAOA CHERY consecutivo, certificação tripla ISO.',
    icon: <Users className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  },
  {
    year: '2022-2023',
    title: 'Excelência e Sustentabilidade',
    description: '2022: Vencedores 9º Prêmio Transporte Responsável em Gestão Ambiental e Desenvolvimento Humano. 2023: Certificação ISO completa em todas as unidades, contrato GWM Brasil para veículos híbridos/elétricos.',
    icon: <Target className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
  },
  {
    year: '2024-2025',
    title: 'Futuro Sustentável',
    description: '2024: Certificação OEA (Operador Econômico Autorizado) e adesão ao Pacto Global da ONU. 2025: Selo Verde e Certificação Carbono Negativo, consolidando nosso compromisso ambiental.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5495.JPG'
  }
];

const AboutStorySection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  type ScrollItem = { content: React.ReactElement };

  const scrollItems: ScrollItem[] = timeline.map((item, index) => ({
    content: (
      <motion.div
        onMouseEnter={() => setHoveredItem(item)}
        onMouseLeave={() => setHoveredItem(null)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group relative w-[740px] h-[460px] overflow-hidden rounded-3xl shadow-[0_25px_60px_-35px_rgba(19,45,81,0.45)] cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            index === 0 ? 'grayscale group-hover:grayscale-0' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gabardo-blue/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    )
  }));

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading story...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Hover Text Display */}
      {hoveredItem && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-8 right-8 z-50 max-w-md rounded-3xl border border-gabardo-light-blue/30 bg-white/95 p-8 shadow-[0_35px_80px_-35px_rgba(19,45,81,0.55)] backdrop-blur-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 6 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-lg shadow-gabardo-blue/40"
            >
              {hoveredItem.icon}
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gabardo-light-blue">
                Capítulo
              </span>
              <span className="text-2xl font-bold text-gabardo-blue">{hoveredItem.year}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold uppercase tracking-wide text-neutral-900 mb-3">
            {hoveredItem.title}
          </h3>
          <p className="text-neutral-600 leading-relaxed text-sm">
            {hoveredItem.description}
          </p>
          
          <div className="mt-4 h-px w-12 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue" />
        </motion.div>
      )}

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
            Nossa Trajetória
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>36 Anos de</span>
            <br />
            <span className="text-neutral-600">Excelência e Confiança</span>
          </motion.h2>
        </motion.div>

        {/* Timeline as Infinite Scroll */}
        <div className="relative mt-14 flex justify-center min-w-screen">
          <div className="min-w-screen">
            <InfiniteScroll
              width="100vw"
              maxHeight="720px"
              itemMinHeight={340}
              negativeMargin="-4rem"
              items={scrollItems as any}
              autoplay
              autoplaySpeed={0.35}
              pauseOnHover
              isTilted
              tiltDirection="left"
              tiltRotateX={22}
              tiltRotateZ={24}
              tiltSkew={26}
            />
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 md:mt-24"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-neutral-700 italic max-w-4xl mx-auto leading-relaxed">
            "Ao longo de seus 36 anos, a Gabardo procura entender as necessidades dos clientes para 
            atendê-los de forma personalizada e eficiente. Nossa missão é transportar mais que veículos."
          </blockquote>
          <div className="mt-6 text-sm font-medium text-neutral-500 tracking-wide uppercase">
            — Sérgio Mário Gabardo, Fundador
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStorySection; 