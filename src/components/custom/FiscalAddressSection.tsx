'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2, FileCheck } from 'lucide-react';
import Image from 'next/image';

const FiscalAddressSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="relative w-full h-full">
            <div className="absolute top-20 right-10 w-32 h-32 bg-neutral-100 rounded-full opacity-50" />
            <div className="absolute bottom-40 right-0 w-24 h-24 bg-neutral-200 rounded-full opacity-30" />
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-black/5 rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
          
          {/* Content Side - Takes 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            
            {/* Badge/Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-neutral-100 px-4 py-2 rounded-full text-sm font-medium text-neutral-700"
            >
              <MapPin className="w-4 h-4" />
              <span className="uppercase tracking-wider">Endereço Fiscal</span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              <span className="block">SEU ENDEREÇO FISCAL</span>
              <span className="block text-neutral-600">NAS MELHORES</span>
              <span className="block">LOCALIZAÇÕES</span>
              <span className="block text-neutral-400 text-3xl md:text-4xl lg:text-5xl font-light">
                DO NORDESTE
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                O plano <strong className="text-black">Caixa Postal</strong> é uma solução moderna para qualquer empresa ou profissional que necessite de um endereço empresarial e fiscal, sem arcar com custos e burocracias desnecessárias.
              </p>
              
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                A gente cuida de toda papelada exigida para você registrar o CNPJ da sua empresa em nosso endereço e ter todas as certidões e alvará de funcionamento em dia. <span className="text-black font-medium">Simples, rápido e fácil.</span>
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { icon: Building2, label: 'Registro CNPJ' },
                { icon: FileCheck, label: 'Alvará em Dia' },
                { icon: MapPin, label: 'Localização Premium' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                  <feature.icon className="w-5 h-5 text-neutral-700" />
                  <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">
                    {feature.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button className="group bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-accent-800 hover:scale-105 hover:shadow-xl flex items-center space-x-3">
                <span>EXATAMENTE! QUERO CONVERSAR</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </motion.div>
          </motion.div>

          {/* Image Side - Takes 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            
            {/* Main Image Container */}
            <div className="relative">
              
              {/* Background Shape */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl transform rotate-3 opacity-60" />
              
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/RECIFE-ANTIGO-01-1024x770.png"
                  alt="Modern office building representing fiscal address locations"
                  width={600}
                  height={400}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-neutral-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-black">Disponível Agora</p>
                    <p className="text-xs text-neutral-600">Em toda região Nordeste</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 h-1 bg-gradient-to-r from-black via-neutral-400 to-transparent transform origin-left"
        />
      </div>
    </section>
  );
};

export default FiscalAddressSection; 