'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, MapPin, Calendar, User } from 'lucide-react';

export default function StorageQuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    vehicleType: '',
    quantity: '',
    location: '',
    duration: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-light tracking-[0.2em] mb-4 uppercase font-secondary"
              style={{ color: '#132D51' }}
            >
              Solicite sua Cotação
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight mb-6 font-primary"
              style={{ color: '#132D51' }}
            >
              Armazenagem
              <br />
              <span style={{ color: '#38B6FF' }}>Personalizada</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-700 font-light leading-relaxed mb-8 font-secondary"
            >
              Receba uma proposta personalizada para suas necessidades de armazenagem. 
              Nossa equipe especializada está pronta para desenvolver a solução ideal para sua empresa.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              {[
                { icon: <Package className="w-5 h-5" />, text: 'Soluções customizadas para cada tipo de veículo' },
                { icon: <MapPin className="w-5 h-5" />, text: 'Localização estratégica em todo o Brasil' },
                { icon: <Calendar className="w-5 h-5" />, text: 'Flexibilidade de prazos e condições' },
                { icon: <User className="w-5 h-5" />, text: 'Atendimento personalizado e especializado' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
                  >
                    {benefit.icon}
                  </div>
                  <p className="text-gray-700 font-secondary">{benefit.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-8 lg:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  />
                </div>
              </div>

              {/* Storage Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Tipo de Veículo
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  >
                    <option value="">Selecione...</option>
                    <option value="passeio">Passeio</option>
                    <option value="comercial">Comercial</option>
                    <option value="moto">Motocicleta</option>
                    <option value="especial">Especial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Quantidade
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Localização Preferida
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  >
                    <option value="">Selecione...</option>
                    <option value="sao-paulo">São Paulo - SP</option>
                    <option value="rio-janeiro">Rio de Janeiro - RJ</option>
                    <option value="belo-horizonte">Belo Horizonte - MG</option>
                    <option value="porto-alegre">Porto Alegre - RS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                    Duração Estimada
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-secondary"
                  >
                    <option value="">Selecione...</option>
                    <option value="1-month">Até 1 mês</option>
                    <option value="3-months">1-3 meses</option>
                    <option value="6-months">3-6 meses</option>
                    <option value="long-term">Longo prazo (6+ meses)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 font-secondary" style={{ color: '#132D51' }}>
                  Informações Adicionais
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-secondary"
                  placeholder="Descreva suas necessidades específicas..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full text-white px-8 py-4 text-base font-medium uppercase tracking-wide hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-3 font-primary"
                style={{ backgroundColor: '#132D51' }}
              >
                <span>Solicitar Cotação</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
