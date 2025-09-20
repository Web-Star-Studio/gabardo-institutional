'use client';

import React, { useState } from 'react';
import { Truck, Shield, MapPin, ArrowRight } from 'lucide-react';

const PROJECT_CATEGORIES = ["TRANSPORTE", "LOGÍSTICA", "SEGURANÇA"] as const;
type ProjectCategoryType = typeof PROJECT_CATEGORIES[number];

interface InfoItem {
  id: string;
  title: string;
  projectCategory: ProjectCategoryType;
  location: string;
  icon: React.ComponentType<any>;
  features: string[];
  color: string;
}

// Content data inspired by JSL's service approach
const infoItems: InfoItem[] = [
  {
    id: 'transporte-veiculos-1',
    title: 'Possuímos uma das maiores e mais modernas frotas de cegonheiras. Atendemos de forma personalizada em todas as regiões do Brasil.',
    projectCategory: 'TRANSPORTE',
    location: 'NACIONAL',
    icon: Truck,
    features: ['Frota moderna com tecnologia embarcada', 'Cobertura nacional e Mercosul', 'Rastreamento em tempo real'],
    color: 'blue'
  },
  {
    id: 'logistica-integrada-1', 
    title: 'Gerenciamos serviços integrados de coleta, armazenagem e distribuição de veículos com tecnologia embarcada.',
    projectCategory: 'LOGÍSTICA',
    location: 'INTEGRADA',
    icon: MapPin,
    features: ['Coleta porta a porta', 'Armazenagem segura', 'Controle de estoque digital'],
    color: 'green'
  },
  {
    id: 'seguranca-total-1',
    title: 'Desenvolvemos soluções completas com seguro total, rastreamento satelital e profissionais capacitados.',
    projectCategory: 'SEGURANÇA', 
    location: 'GARANTIDA',
    icon: Shield,
    features: ['Seguro total do veículo', 'Profissionais certificados', 'Monitoramento 24h'],
    color: 'red'
  }
];

const PremiumInfoSection: React.FC = () => {
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<ProjectCategoryType>(PROJECT_CATEGORIES[0]);

  // Show only the first item for each category
  const activeItem = infoItems.find(item => item.projectCategory === selectedProjectCategory) || infoItems[0];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/5 to-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-sm font-mono text-white/70 tracking-[0.3em] uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Nossos Serviços
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/40" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">SOLUÇÕES COMPLETAS</span>
            <span className="block">EM</span>
            <span className="block text-blue-accent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              TRANSPORTE DE VEÍCULOS
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Escolha o serviço ideal para suas necessidades e descubra por que somos referência no transporte de veículos
          </p>
        </div>

        {/* Service Category Buttons */}
        <div className="flex justify-center mb-12 md:mb-16">
          <nav className="flex flex-wrap gap-4 p-2 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10" role="tablist" aria-label="Service Category selection">
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = selectedProjectCategory === category;
              const item = infoItems.find(item => item.projectCategory === category);
              const IconComponent = item?.icon || Truck;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedProjectCategory(category)}
                  role="tab"
                  aria-selected={isActive}
                  className={`group relative flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 rounded-xl ${
                    isActive 
                      ? 'bg-blue-glow text-white shadow-lg shadow-blue-500/25 scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-102'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`} />
                  <span className="font-medium tracking-wide">{category}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-xl" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Service Info Card */}
          <div 
            key={`content-${activeItem.id}`}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:bg-black/50 hover:border-white/20"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity duration-500 ${
              activeItem.color === 'blue' ? 'from-blue-500 to-blue-600' :
              activeItem.color === 'green' ? 'from-green-500 to-green-600' :
              'from-red-500 to-red-600'
            }`} />
            
            <div className="relative z-10">
              {/* Icon & Category */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center ${
                  activeItem.color === 'blue' ? 'from-blue-500/20 to-blue-600/30' :
                  activeItem.color === 'green' ? 'from-green-500/20 to-green-600/30' :
                  'from-red-500/20 to-red-600/30'
                } shadow-lg`}>
                  <activeItem.icon className={`w-8 h-8 ${
                    activeItem.color === 'blue' ? 'text-blue-400' :
                    activeItem.color === 'green' ? 'text-green-400' :
                    'text-red-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {activeItem.projectCategory}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mt-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                      {activeItem.location}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                {activeItem.title}
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                {activeItem.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activeItem.color === 'blue' ? 'bg-blue-400' :
                      activeItem.color === 'green' ? 'bg-green-400' :
                      'bg-red-400'
                    }`} />
                    <span className="text-white/70 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <button className="group flex items-center gap-2 bg-blue-glow text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                <span>Saiba mais sobre {activeItem.projectCategory.toLowerCase()}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl transform rotate-1 opacity-50" />
            
            {/* Main Visual Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 p-8 md:p-12 text-center">
              
              {/* Large Icon */}
              <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br flex items-center justify-center ${
                activeItem.color === 'blue' ? 'from-blue-500/30 to-blue-600/40 shadow-blue-500/20' :
                activeItem.color === 'green' ? 'from-green-500/30 to-green-600/40 shadow-green-500/20' :
                'from-red-500/30 to-red-600/40 shadow-red-500/20'
              } shadow-2xl`}>
                <activeItem.icon className={`w-16 h-16 ${
                  activeItem.color === 'blue' ? 'text-blue-300' :
                  activeItem.color === 'green' ? 'text-green-300' :
                  'text-red-300'
                }`} />
              </div>
              
              {/* Stats or Info */}
              <div className="space-y-4">
                <div className="text-5xl md:text-6xl font-black text-white">
                  {activeItem.color === 'blue' ? '35+' :
                   activeItem.color === 'green' ? '24/7' : '100%'}
                </div>
                <p className="text-lg text-white/70">
                  {activeItem.color === 'blue' ? 'Anos de experiência' :
                   activeItem.color === 'green' ? 'Suporte disponível' : 'Segurança garantida'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumInfoSection;
