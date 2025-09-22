'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, MapPin, Clock, Star, Users } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const services: Service[] = [
  {
    id: 'transporte-cargas',
    title: 'Transporte de Veículos',
    description: 'Possuímos uma das maiores e mais modernas frotas de cegonheiras. Atendemos de forma personalizada em todas as regiões do Brasil e países do Mercosul.',
    features: ['Frota moderna com tecnologia embarcada', 'Cobertura nacional e Mercosul', 'Rastreamento em tempo real', 'Seguro total incluso'],
    icon: Truck,
    color: 'amber'
  },
  {
    id: 'logistica-integrada',
    title: 'Logística Integrada', 
    description: 'Gerenciamos serviços completos de coleta, armazenagem e distribuição de veículos com controle total da operação e máxima eficiência.',
    features: ['Coleta porta a porta', 'Armazenagem segura', 'Controle de estoque digital', 'Distribuição programada'],
    icon: MapPin,
    color: 'blue'
  },
  {
    id: 'seguranca-total',
    title: 'Segurança & Proteção',
    description: 'Desenvolvemos soluções completas de segurança com profissionais treinados, equipamentos de última geração e cobertura total de seguros.',
    features: ['Seguro total do veículo', 'Profissionais certificados', 'Equipamentos de segurança', 'Monitoramento 24h'],
    icon: Shield,
    color: 'green'
  },
  {
    id: 'atendimento',
    title: 'Atendimento Personalizado',
    description: 'Oferecemos suporte dedicado com equipe especializada para atender suas necessidades específicas de transporte de veículos.',
    features: ['Atendimento 24/7', 'Equipe especializada', 'Soluções customizadas', 'Relatórios detalhados'],
    icon: Users,
    color: 'purple'
  },
  {
    id: 'prazo-qualidade',
    title: 'Prazo & Qualidade',
    description: 'Cumprimos rigorosamente os prazos estabelecidos mantendo os mais altos padrões de qualidade no transporte de veículos.',
    features: ['Pontualidade garantida', 'Qualidade certificada', 'Processos otimizados', 'Excelência reconhecida'],
    icon: Clock,
    color: 'red'
  },
  {
    id: 'experiencia',
    title: 'Experiência Comprovada',
    description: 'Com mais de 35 anos no mercado, acumulamos vasta experiência e conquistamos a confiança de centenas de clientes em todo o Brasil.',
    features: ['35+ anos de mercado', 'Centenas de clientes', 'Experiência comprovada', 'Reconhecimento nacional'],
    icon: Star,
    color: 'yellow'
  }
];

const JSLInspiredServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="text-sm font-mono text-gray-600 tracking-[0.3em] uppercase">
              Portfólio de Serviços
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          
          <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-gabardo-blue mb-6 leading-tight">
            Conheça a
            <br />
            <span className="text-gabardo-light-blue">Gabardo</span>
          </h2>
          
          <p className="font-secondary text-xl md:text-2xl text-gray-700 font-light max-w-4xl mx-auto leading-relaxed">
            A Gabardo é uma empresa 100% brasileira especializada em transporte de veículos. 
            Tem o maior e mais integrado portfólio de serviços e, sabe o porquê?
          </p>
          
          <p className="font-secondary text-lg text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            Ao longo de seus 35 anos, procura entender as necessidades dos clientes para atendê-los 
            de forma personalizada e eficiente. Saiba mais sobre cada serviço. Vamos nessa?
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 p-8 h-full rounded-xl">
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-sm bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gabardo-light-blue/10 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-gray-700 group-hover:text-gabardo-blue transition-colors duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gabardo-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-gabardo-light-blue mt-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-gray-700 font-semibold group-hover:gap-4 group-hover:text-gabardo-blue transition-all duration-300">
                    <span className="text-sm uppercase tracking-wider">Saiba mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default JSLInspiredServicesSection;
