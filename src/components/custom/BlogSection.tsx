'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Clock, User, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tecnologia no Transporte de Veículos: Inovações 2025',
    excerpt: 'Descubra como a tecnologia embarcada e rastreamento satelital estão revolucionando o transporte seguro de veículos.',
    category: 'Tecnologia',
    date: '15 Jan 2025',
    readTime: '5 min',
    author: 'Equipe Gabardo',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Segurança no Transporte: Nosso Compromisso Total',
    excerpt: 'Conheça os protocolos de segurança e tecnologias que garantem a proteção total dos veículos durante o transporte.',
    category: 'Segurança',
    date: '12 Jan 2025',
    readTime: '7 min',
    author: 'Equipe Técnica',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: '3',
    title: 'Sustentabilidade na Logística de Transporte',
    excerpt: 'Como a Gabardo implementa práticas sustentáveis no transporte de veículos, reduzindo impacto ambiental.',
    category: 'Sustentabilidade',
    date: '10 Jan 2025',
    readTime: '4 min',
    author: 'Gabardo Transportes',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: '4',
    title: 'Tecnologia e Produtividade: A Nova Era',
    excerpt: 'Ferramentas e tecnologias que estão transformando a forma como trabalhamos e nos conectamos.',
    category: 'Tecnologia',
    date: '08 Jan 2025',
    readTime: '6 min',
    author: 'Carlos Ferreira',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

const BlogSection: React.FC = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/3 to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 relative z-10"
        >
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white mb-6 border border-white/20"
          >
            <Sparkles className="w-4 h-4" />
            <span className="uppercase tracking-wider">Blog Gabardo</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span className="block">NOVIDADES DO</span>
            <span className="block text-white/70">TRANSPORTE</span>
            <span className="block">DE VEÍCULOS</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Insights, tecnologias e novidades do setor de transporte de veículos
          </motion.p>
        </motion.div>

        {/* Blog Content */}
        <div className="relative z-10">
          
          {/* Featured Post + Regular Posts Layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
            
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 flex"
              >
                <div
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/30 cursor-pointer w-full flex flex-col"
                  onMouseEnter={() => setHoveredPost(featuredPost.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  
                  {/* Image */}
                  <div className="relative h-80 md:h-96 overflow-hidden flex-shrink-0">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Destaque
                    </div>
                    
                    {/* Category */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                      {featuredPost.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    
                    {/* Main Content */}
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-white/60 text-sm mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors duration-300">
                        {featuredPost.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white/70 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center space-x-2 text-white group-hover:text-white/90 transition-colors duration-300 mt-6">
                      <span className="font-medium">Ler artigo completo</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Regular Posts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col"
            >
              {/* Posts Container */}
              <div className="space-y-14 flex-grow">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/30 cursor-pointer"
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    <div className="flex">
                      
                      {/* Image */}
                      <div className="relative w-32 md:w-40 h-24 md:h-28 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="160px"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-5">
                        
                        {/* Category */}
                        <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2">
                          {post.category}
                        </div>

                        {/* Title */}
                        <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-2 group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h4>

                        {/* Meta */}
                        <div className="flex items-center space-x-3 text-white/50 text-xs">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="p-4 flex items-center">
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-6"
              >
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/40 flex items-center justify-center space-x-2 group">
                  <span>Ver todos os artigos</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform origin-center"
        />
      </div>
    </section>
  );
};

export default BlogSection; 