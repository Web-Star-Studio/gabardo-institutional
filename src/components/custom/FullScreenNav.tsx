'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  subMenu?: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<MenuItem>;
}

const ANIMATION_DURATION = 800;

const KEY_LOCATIONS = [
  { id: 'porto-alegre', label: 'Porto Alegre', href: '/localizacao/porto-alegre' },
  { id: 'sao-paulo', label: 'São Paulo', href: '/localizacao/sao-paulo' },
  { id: 'rio-de-janeiro', label: 'Rio de Janeiro', href: '/localizacao/rio-de-janeiro' },
];

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
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      setActiveSubMenu(null);
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

  const renderMainMenu = () => (
    <motion.div
      key="main-menu"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="space-y-1 md:space-y-1 mb-6 md:mb-0">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            className="group"
          >
            {item.subMenu ? (
              <button
                onClick={() => setActiveSubMenu(item.id)}
                className="flex items-center justify-between w-full py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
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
              </button>
            ) : (
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
            )}
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );

  const renderSubMenu = () => {
    const activeItem = menuItems.find(item => item.id === activeSubMenu);
    if (!activeItem || !activeItem.subMenu) return null;

    return (
      <motion.div
        key="sub-menu"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
      >
        <button onClick={() => setActiveSubMenu(null)} className="flex items-center text-white/70 hover:text-white mb-4">
          <ChevronLeft size={16} className="mr-2" />
          Voltar
        </button>
        <nav className="space-y-1 md:space-y-1">
          {activeItem.subMenu.map((subItem, index) => (
            <motion.div
              key={subItem.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
              className="group"
            >
              <Link 
                href={subItem.href}
                onClick={onClose}
                className="flex items-center justify-between py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
              >
                <span className="text-lg md:text-xl lg:text-2xl font-light tracking-tight">
                  {subItem.label}
                </span>
                <ChevronRight 
                  size={isMobile ? 16 : 20} 
                  className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 text-blue-bright" 
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    );
  };

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
                alt="Gabardo Distribuidora"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          </div>

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

          <div className="relative z-10 h-full flex flex-col md:flex-row">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full md:w-3/5 lg:w-1/2 h-full flex flex-col justify-start pt-6 md:pt-8 p-4 md:p-8 lg:p-10 overflow-y-auto"
            >
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

              <AnimatePresence mode="wait">
                {activeSubMenu ? renderSubMenu() : renderMainMenu()}
              </AnimatePresence>

            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="hidden md:flex w-2/5 lg:w-1/2 h-full flex-col justify-center p-6 md:p-8 lg:p-10 bg-white/5 backdrop-blur-md"
            >
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
                      
                      <div className="flex items-center space-x-2 mb-3 text-gabardo-light-blue">
                        <Clock size={14} />
                        <span className="text-sm">Seg-Sex: 8h às 18h</span>
                      </div>
                      
                      <Link
                        href="/contato"
                        onClick={onClose}
                        className="inline-flex items-center space-x-2 text-gabardo-light-blue hover:text-white transition-colors duration-300"
                      >
                        <span className="text-sm">Solicitar Cotação</span>
                        <ChevronRight size={14} />
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
