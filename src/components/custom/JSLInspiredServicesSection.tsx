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
            <div className="w-12 h-px bg-neutral-300"></div>
            <span className="text-sm font-mono text-neutral-600 tracking-[0.3em] uppercase">
              Portfólio de Serviços
            </span>
            <div className="w-12 h-px bg-neutral-300"></div>
          </div>
          
          <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Conheça a
            <br />
            <span className="text-amber-500/80">Gabardo</span>
          </h2>
          
          <p className="font-secondary text-xl md:text-2xl text-neutral-600 font-light max-w-4xl mx-auto leading-relaxed">
            A Gabardo é uma empresa 100% brasileira especializada em transporte de veículos. 
            Tem o maior e mais integrado portfólio de serviços e, sabe o porquê?
          </p>
          
          <p className="font-secondary text-lg text-neutral-500 max-w-3xl mx-auto mt-6 leading-relaxed">
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
                <div className="bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 h-full">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-${service.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-amber-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed mb-6 text-base">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${service.color}-500 mt-2 flex-shrink-0`}></div>
                        <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all duration-300">
                    <span className="text-sm uppercase tracking-wider">Saiba mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20 md:mt-32"
        >
          <div className="bg-black text-white p-12 md:p-16 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Pronto para encontrar a solução ideal 
              <br />
              <span className="text-amber-400/70">para o seu negócio?</span>
            </h3>
            
            <p className="text-xl text-white/80 font-light mb-8 max-w-2xl mx-auto">
              Nossa equipe está preparada para entender suas necessidades e criar 
              uma solução personalizada de transporte de veículos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500/80 hover:bg-amber-600/80 text-black px-10 py-4 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Solicitar Orçamento
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-semibold uppercase tracking-wide transition-all duration-300">
                Falar com Especialista
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JSLInspiredServicesSection;
