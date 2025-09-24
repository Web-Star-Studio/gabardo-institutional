'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px" style={{background: 'linear-gradient(to bottom, #38B6FF, #a3a3a3, transparent)'}}></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 rounded-full z-10" style={{borderColor: '#38B6FF'}}></div>

                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white p-8 md:p-10 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500`}
                    style={activeIndex === index ? {borderColor: '#38B6FF'} : {}}
                  >
                    {/* Year */}
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 text-white rounded-full flex items-center justify-center mr-4"
                        style={{backgroundColor: '#132D51'}}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-3xl md:text-4xl font-bold" style={{color: '#132D51'}}>
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-4">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 font-light leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Image */}
                <div className={`flex-1 mt-6 md:mt-0 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-64 md:h-80 object-cover ${
                        index === 0 ? 'filter grayscale hover:grayscale-0 transition-all duration-500' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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