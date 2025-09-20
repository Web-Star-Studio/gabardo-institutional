import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, MapPin, Clock, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '@/data/hubPluralContent';

interface MenuLocation {
  id: string;
  label: string;
  href: string;
}

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    id: string;
    label: string;
    href: string;
    imageSrc: string;
  }>;
}

const ANIMATION_DURATION = 800;

// Simplified locations - only key locations
const KEY_LOCATIONS: MenuLocation[] = [
  { id: 'porto-alegre', label: 'Porto Alegre', href: '/localizacao/porto-alegre' },
  { id: 'sao-paulo', label: 'São Paulo', href: '/localizacao/sao-paulo' },
  { id: 'rio-de-janeiro', label: 'Rio de Janeiro', href: '/localizacao/rio-de-janeiro' },
];

// Simplified services - only main ones
const KEY_SERVICES = [
  { id: 'transporte-veiculos', label: 'Transporte de Veículos', href: '/servicos/transporte-veiculos' },
  { id: 'transporte-prancha', label: 'Transporte em Prancha', href: '/servicos/transporte-prancha' },
  { id: 'armazenagem', label: 'Armazenagem', href: '/servicos/armazenagem' },
];

const FullScreenNav: React.FC<FullScreenNavProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  const defaultImageSrc = menuItems.length > 0 ? menuItems[0].imageSrc : '';
  const [hoveredItemImage, setHoveredItemImage] = useState<string>(defaultImageSrc);
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [activeSection, setActiveSection] = useState<'nav' | 'services' | 'locations'>('nav');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setHoveredItemImage(defaultImageSrc);
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      setActiveSection('nav');
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultImageSrc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 font-['Inter',_sans-serif]"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <motion.div
              key={hoveredItemImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={hoveredItemImage}
                alt="Gabardo Transportes"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          </div>

          {/* Mobile Close Button - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-6 right-6 z-20 md:hidden"
          >
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
              aria-label="Close menu"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col md:flex-row">
            
            {/* Navigation Section - Full width on mobile */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full md:w-3/5 lg:w-1/2 h-full flex flex-col justify-start pt-6 md:pt-8 p-4 md:p-8 lg:p-10 overflow-y-auto"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 md:mb-8 mt-2 md:mt-0 px-3 md:px-2"
              >
                <Link href="/" onClick={onClose} className="inline-block w-full">
                  <div className="flex items-center justify-start overflow-hidden">
                    <Image
                      src="/gabardo-logo.png"
                      alt="Gabardo Logo"
                      width={isMobile ? 120 : 160}
                      height={isMobile ? 32 : 43}
                      priority
                      className="h-auto w-auto max-w-[90%] object-contain"
                      style={{ 
                        filter: 'brightness(2) contrast(1.5) opacity(0.95)',
                        WebkitFilter: 'brightness(2) contrast(1.5) opacity(0.95)'
                      }}
                    />
                  </div>
                </Link>
              </motion.div>

              {/* Main Navigation */}
              <nav className="space-y-1 md:space-y-1 mb-6 md:mb-0">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    className="group"
                  >
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
                      onMouseEnter={() => !isMobile && setHoveredItemImage(item.imageSrc)}
                      onMouseLeave={() => !isMobile && setHoveredItemImage(defaultImageSrc)}
                      onTouchStart={() => isMobile && setHoveredItemImage(item.imageSrc)}
                    >
                      <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight">
                        {item.label}
                      </span>
                      <ChevronRight 
                        size={isMobile ? 16 : 20} 
                        className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 text-blue-bright" 
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 md:mt-10 flex flex-col md:flex-row gap-3"
              >
                <button
                  onClick={() => setActiveSection('services')}
                  className={`px-4 py-2 text-sm rounded-full border border-white/30 text-white transition-all duration-300 hover:bg-white/10 active:bg-white/20 touch-manipulation ${
                    activeSection === 'services' ? 'bg-blue-80 text-white border-blue-80' : ''
                  }`}
                >
                  Serviços
                </button>
                <button
                  onClick={() => setActiveSection('locations')}
                  className={`px-4 py-2 text-sm rounded-full border border-white/30 text-white transition-all duration-300 hover:bg-white/10 active:bg-white/20 touch-manipulation ${
                    activeSection === 'locations' ? 'bg-blue-80 text-white border-blue-80' : ''
                  }`}
                >
                  Localizações
                </button>
              </motion.div>

              {/* Mobile Dynamic Content */}
              <div className="md:hidden mt-6">
                <AnimatePresence mode="wait">
                  {activeSection === 'services' && (
                    <motion.div
                      key="mobile-services"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <h3 className="text-lg font-light text-white mb-4">Nossos Serviços</h3>
                      {KEY_SERVICES.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Link
                            href={service.href}
                            onClick={onClose}
                            className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-300 text-white group touch-manipulation"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-light">{service.label}</span>
                              <ChevronRight size={14} className="transition-transform duration-300 text-blue-bright" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeSection === 'locations' && (
                    <motion.div
                      key="mobile-locations"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <h3 className="text-lg font-light text-white mb-4">Nossas Unidades</h3>
                      {KEY_LOCATIONS.map((location, index) => (
                        <motion.div
                          key={location.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Link
                            href={location.href}
                            onClick={onClose}
                            className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-300 text-white group touch-manipulation"
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin size={14} className="flex-shrink-0 text-blue-bright" />
                              <span className="text-sm font-light">{location.label}</span>
                              <ChevronRight size={14} className="ml-auto transition-transform duration-300 text-blue-bright" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side - Desktop Only Dynamic Content */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="hidden md:flex w-2/5 lg:w-1/2 h-full flex-col justify-center p-6 md:p-8 lg:p-10 bg-white/5 backdrop-blur-md"
            >
              {/* Desktop Close Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-6 right-6"
              >
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
                  aria-label="Close menu"
                >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </motion.div>

              {/* Desktop Dynamic Content */}
              <AnimatePresence mode="wait">
                {activeSection === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-light text-white mb-6">Nossos Serviços</h3>
                    {KEY_SERVICES.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          href={service.href}
                          onClick={onClose}
                          className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base font-light">{service.label}</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'locations' && (
                  <motion.div
                    key="locations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-light text-white mb-6">Nossas Unidades</h3>
                    {KEY_LOCATIONS.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          href={location.href}
                          onClick={onClose}
                          className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white group"
                        >
                          <div className="flex items-center space-x-2">
                            <MapPin size={14} className="text-blue-bright" />
                            <span className="text-base font-light">{location.label}</span>
                            <ChevronRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'nav' && (
                  <motion.div
                    key="nav"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="text-white/80">
                      <h3 className="text-lg font-light mb-3">Gabardo Transportes</h3>
                      <p className="text-base font-light leading-relaxed mb-4">
                        Há mais de 35 anos transportando veículos com segurança, tecnologia e excelência em todo o Brasil.
                      </p>
                      
                      <div className="flex items-center space-x-2 mb-3 text-blue-accent">
                        <Clock size={14} />
                        <span className="text-sm">Seg-Sex: 8h às 18h</span>
                      </div>
                      
                      <Link
                        href="/contato"
                        onClick={onClose}
                        className="inline-flex items-center space-x-2 text-blue-accent hover:text-white transition-colors duration-300"
                      >
                        <span className="text-sm">Solicitar Cotação</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-3 pt-6 border-t border-white/20">
                      <Link 
                        href="http://fb.com/transgabardo" 
                        target="_blank"
                        className="w-8 h-8 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">Facebook</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </Link>
                      <Link 
                        href="#" 
                        target="_blank"
                        className="w-8 h-8 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"/>
                        </svg>
                      </Link>
                      <Link 
                        href="https://www.linkedin.com/company/transportes-gabardo/" 
                        target="_blank"
                        className="w-8 h-8 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenNav;

// Example Usage (would go in Header.tsx or similar):
/*
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MOCK_MENU_ITEMS = [
    { id: 'home', label: 'HOME', href: '/', imageSrc: '/placeholder-home.jpg' },
    { id: 'sobre', label: 'SOBRE', href: '/sobre', imageSrc: '/placeholder-sobre.jpg' },
    { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/placeholder-blog.jpg' },
    { id: 'localizacao', label: 'LOCALIZAÇÃO', href: '/localizacao', imageSrc: '/placeholder-localizacao.jpg' },
    { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: '/placeholder-contato.jpg' },
  ];

  return (
    <div>
      <button onClick={() => setIsMenuOpen(true)}>Open Menu</button>
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={MOCK_MENU_ITEMS}
      />
    </div>
  );
};
*/ 