'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Serviços',
      links: [
        'Transporte de Veículos',
        'Transporte em Prancha',
        'Armazenagem',
        'Logística Integrada'
      ]
    },
    {
      title: 'Empresa',
      links: [
        'Sobre Nós',
        'Blog',
        'Carreiras',
        'Contato'
      ]
    },
    {
      title: 'Suporte',
      links: [
        'Central de Ajuda',
        'FAQ',
        'Privacidade',
        'Termos'
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Matriz - Porto Alegre, RS' },
    { icon: Phone, text: '+55 (51) 3373-3000' },
    { icon: Mail, text: 'gabardo@transgabardo.com.br' }
  ];

  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4">
                  <Image
                    src="/gabardo-logo.png"
                    alt="Gabardo Logo"
                    width={132}
                    height={44}
                    className="h-auto w-auto"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) invert(14%) sepia(64%) saturate(1159%) hue-rotate(202deg) brightness(90%) contrast(96%)',
                      WebkitFilter: 'brightness(0) saturate(100%) invert(14%) sepia(64%) saturate(1159%) hue-rotate(202deg) brightness(90%) contrast(96%)'
                    }}
                  />
                </div>
                <p className="leading-relaxed md:mt-16 max-w-sm" style={{color: '#132D51'}}>
                  Distribuindo soluções e conectando negócios para o futuro.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3 "
              >
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <contact.icon className="w-4 h-4 flex-shrink-0" style={{color: '#132D51'}} />
                    <span className="text-sm" style={{color: '#132D51'}}>{contact.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + (sectionIndex * 0.1) }}
                    className="space-y-4"
                  >
                    <h4 className="font-semibold text-sm uppercase tracking-wider" style={{color: '#132D51'}}>
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm transition-colors duration-200"
                            style={{color: '#132D51'}}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#38B6FF'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#132D51'}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-sm uppercase tracking-wider" style={{color: '#132D51'}}>
                  Social
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-200 group"
                      style={{backgroundColor: '#132D51', borderColor: '#132D51'}}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#38B6FF';
                        e.currentTarget.style.borderColor = '#38B6FF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#132D51';
                        e.currentTarget.style.borderColor = '#132D51';
                      }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-neutral-100 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm" style={{color: '#132D51'}}>
              2025 Gabardo Distribuidora. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="transition-colors duration-200" 
                style={{color: '#132D51'}} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#38B6FF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = '#132D51'}
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="transition-colors duration-200" 
                style={{color: '#132D51'}} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#38B6FF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = '#132D51'}
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 