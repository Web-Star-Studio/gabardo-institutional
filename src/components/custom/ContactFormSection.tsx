'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

// Simplified interest options
const interestOptions = [
  'Coworking',
  'Escritório Privativo',
  'Sala de Reunião',
  'Escritório Virtual',
  'Eventos',
  'Outros'
];

export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      interest: formData.get('interest') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        (event.target as HTMLFormElement).reset();
      } else {
        setError('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="contact-form" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-black uppercase tracking-tight mb-6"
            >
              Mensagem Enviada!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-neutral-600 font-light text-xl leading-relaxed mb-10"
            >
              Obrigado pelo seu contato! Nossa equipe retornará em até 24 horas.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className="bg-amber-400/80 text-black px-8 py-4 text-lg font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
            >
              Enviar Nova Mensagem
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.3em] text-neutral-500 mb-6 uppercase"
          >
            Formulário de Contato
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Como Podemos
            <br />
            <span className="text-amber-400/80">Ajudar?</span>
          </motion.h2>
        </motion.div>

        {/* Refined Form */}
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 p-6 flex items-center space-x-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            {/* Essential Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3"
              >
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Nome Completo *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={100}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="Seu nome completo"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  E-mail *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="seu@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Telefone
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={20}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="(00) 0000-0000"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'phone' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>

              {/* Interest Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-3"
              >
                <label htmlFor="interest" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Interesse
                </label>
                <motion.select
                  id="interest"
                  name="interest"
                  onFocus={() => setFocusedField('interest')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">Selecione seu interesse</option>
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </motion.select>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'interest' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-8">
              
              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-3"
              >
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Assunto *
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  minLength={5}
                  maxLength={150}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="Qual o assunto da sua mensagem?"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'subject' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-3"
              >
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Mensagem *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={6}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-neutral-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400 resize-none"
                  placeholder="Conte-nos mais sobre o que você precisa..."
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-amber-400/80"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center pt-8"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-black text-white px-12 py-4 text-lg font-bold uppercase tracking-wide hover:bg-amber-400/80 hover:text-black transition-all duration-300 flex items-center space-x-4 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:x-0"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
} 