'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react'; // Renamed to avoid conflict if a Menu component is made later
import FullScreenNav from '@/components/custom/FullScreenNav'; // New menu

const GABARDO_FULL_SCREEN_NAV_ITEMS = [
  { id: 'home', label: 'HOME', href: '/', imageSrc: '/gabardo-slide-1.jpg' },
  { id: 'servicos', label: 'SERVIÇOS', href: '/servicos', imageSrc: '/gabardo-slide-2.jpg' },
  { id: 'sobre', label: 'SOBRE', href: '/sobre', imageSrc: '/gabardo-slide-1.jpg' },
  { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/gabardo-slide-2.jpg' },
  { id: 'localizacao', label: 'NOSSAS UNIDADES', href: '/localizacao', imageSrc: '/gabardo-slide-1.jpg' },
  { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: '/gabardo-slide-2.jpg' },
];

const HeaderRevised = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile detection for optimal logo sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll detection for header background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state
      setIsScrolled(currentScrollY > 100);
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Specific close function for clarity when passing to menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-30 pt-4 md:pt-6 text-white transition-all duration-500 ${
        isScrolled ? 'bg-black/5 backdrop-blur-xl pt-3 md:pt-4' : ''
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Increased z-index to 30 to be above hero's overlay (z-20 if any, image is z-10) but below menu (z-40) */}
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center text-2xl font-semibold tracking-wider touch-manipulation group transition-all duration-300 hover:scale-105 -ml-2 sm:-ml-4 md:-ml-6"
              aria-label="Gabardo Distribuidora - Página inicial"
            >
              <div className="relative">
                <Image
                  src="/gabardo-logo.png"
                  alt="Gabardo Logo"
                  width={isMobile ? (isScrolled ? 100 : 120) : (isScrolled ? 130 : 150)}
                  height={isMobile ? (isScrolled ? 33 : 40) : (isScrolled ? 43 : 50)}
                  priority
                  className="h-auto w-auto transition-all duration-500 group-hover:brightness-110"
                  style={{ 
                    filter: 'brightness(2) contrast(1.5) opacity(0.95)',
                    WebkitFilter: 'brightness(2) contrast(1.5) opacity(0.95)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
              </div>
            </Link>
            <button
              onClick={toggleMenu}
              className="group relative flex items-center justify-center text-white hover:text-blue-300 transition-all duration-300 touch-manipulation p-3 -m-3 rounded-full hover:bg-white/10"
              aria-label="Abrir menu de navegação"
              aria-expanded={isMenuOpen}
            >
              <div className="relative">
                <MenuIcon 
                  size={isMobile ? (isScrolled ? 32 : 36) : (isScrolled ? 38 : 42)} 
                  className="transition-all duration-300 group-hover:scale-110 group-active:scale-95" 
                />
                <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-150 transition-transform duration-300" />
              </div>
              <span className="sr-only">Menu</span>
            </button>
          </div>
          <div className={`mt-4 md:mt-6 h-px bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-20' : 'opacity-30'
          }`}></div>
        </div>
      </div>
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={GABARDO_FULL_SCREEN_NAV_ITEMS}
      />
    </>
  );
};

export { HeaderRevised as Header }; 