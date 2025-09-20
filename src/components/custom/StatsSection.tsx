'use client';

import React from 'react';
import { Star, TrendingUp, Users, Shield, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-400/60" />
              <span className="text-sm font-mono text-gray-600 tracking-[0.3em] uppercase bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                Números que Falam
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-400/60" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">RESULTADOS QUE</span>
              <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                COMPROVAM NOSSA
              </span>
              <span className="block">EXCELÊNCIA</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mais de três décadas de excelência no transporte de veículos com resultados que falam por si só
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '35+', label: 'Anos de Experiência', description: 'Décadas de tradição e confiança', type: 'clock', icon: Clock, color: 'blue' },
              { number: '1.000+', label: 'Veículos Transportados', description: 'Mensalmente com segurança', type: 'trending', icon: TrendingUp, color: 'green' },
              { number: '500+', label: 'Clientes Ativos', description: 'Empresas que confiam na Gabardo', type: 'users', icon: Users, color: 'purple' },
              { number: '98%', label: 'Satisfação dos Clientes', description: 'Excelência comprovada', type: 'star', icon: Star, color: 'yellow' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-10 h-full transition-all duration-500 hover:bg-white hover:border-gray-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-500/10 relative overflow-hidden">
                  
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                    stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    stat.color === 'green' ? 'from-green-500 to-green-600' :
                    stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-yellow-500 to-yellow-600'
                  }`} />
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      stat.color === 'blue' ? 'from-blue-500/20 to-blue-600/30 shadow-blue-500/20' :
                      stat.color === 'green' ? 'from-green-500/20 to-green-600/30 shadow-green-500/20' :
                      stat.color === 'purple' ? 'from-purple-500/20 to-purple-600/30 shadow-purple-500/20' :
                      'from-yellow-500/20 to-yellow-600/30 shadow-yellow-500/20'
                    } shadow-lg`}>
                      <stat.icon className={`w-8 h-8 ${
                        stat.color === 'blue' ? 'text-blue-400' :
                        stat.color === 'green' ? 'text-green-400' :
                        stat.color === 'purple' ? 'text-purple-400' :
                        'text-yellow-400'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Number */}
                  <div className="text-center mb-4">
                    <div className="text-5xl md:text-6xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-center mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
                      {stat.label}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center">
                    <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                  
                  {/* Decorative line */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${
                    stat.color === 'blue' ? 'from-blue-500 to-blue-400' :
                    stat.color === 'green' ? 'from-green-500 to-green-400' :
                    stat.color === 'purple' ? 'from-purple-500 to-purple-400' :
                    'from-yellow-500 to-yellow-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className="mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />
      </div>
    </section>
  );
};

export default StatsSection;
