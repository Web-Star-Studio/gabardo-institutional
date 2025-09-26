'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const ServicesQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-gabardo-light-blue/30 to-gabardo-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-gabardo-blue/30 to-gabardo-light-blue/20 rounded-full blur-3xl" />
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
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Solicite Seu Orçamento
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Vamos Trabalhar</span>
            <br />
            <span className="text-neutral-600">Juntos?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-neutral-600 mt-6 max-w-2xl mx-auto"
          >
            Preencha o formulário abaixo e receba uma proposta personalizada para suas necessidades de transporte de veículos.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 md:p-12 shadow-xl rounded-2xl border border-neutral-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Empresa *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                    Tipo de Serviço *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                  >
                    <option value="">Selecione o serviço</option>
                    <option value="transporte-veiculos">Transporte de Veículos</option>
                    <option value="transporte-prancha">Transporte em Prancha</option>
                    <option value="armazenagem">Armazenagem</option>
                    <option value="logistica-integrada">Logística Integrada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                    Detalhes do Projeto
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors resize-none"
                    placeholder="Descreva suas necessidades, volume esperado, rotas, prazos e outras informações relevantes..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 text-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
                  style={{backgroundColor: '#132D51'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1f3a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#132D51'}
                >
                  <Send className="w-5 h-5" />
                  Solicitar Orçamento
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8 space-y-8">
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg space-y-6">
                <h3 className="text-xl font-semibold" style={{color: '#132D51'}}>
                  Atendimento Comercial
                </h3>
                <p className="text-neutral-600">
                  Nossa equipe responde rapidamente para montar a solução ideal para sua operação logística.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold" style={{color: '#132D51'}}>E-mail</h4>
                      <p className="text-neutral-600">comercial@transgabardo.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold" style={{color: '#132D51'}}>Matriz</h4>
                      <p className="text-neutral-600">Porto Alegre - RS</p>
                      <p className="text-neutral-600">14 unidades no Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesQuoteSection;
