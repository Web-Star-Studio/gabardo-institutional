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

const HeaderRevised = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection for optimal logo sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Specific close function for clarity when passing to menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-30 pt-4 md:pt-6">
        {/* Increased z-index to 30 to be above hero's overlay (z-20 if any, image is z-10) but below menu (z-40) */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center text-2xl font-semibold tracking-wider touch-manipulation"
              aria-label="Gabardo Distribuidora - Página inicial"
            >
              <Image
                src="/gabardo-logo.png"
                alt="Gabardo Logo"
                width={isMobile ? 120 : 150}
                height={isMobile ? 40 : 50}
                priority
                className="h-auto w-auto"
                style={{ 
                  filter: variant === 'dark' 
                    ? 'brightness(2) contrast(1.5) opacity(0.95)' 
                    : 'brightness(0.2) contrast(1.2) opacity(0.9)',
                  WebkitFilter: variant === 'dark' 
                    ? 'brightness(2) contrast(1.5) opacity(0.95)' 
                    : 'brightness(0.2) contrast(1.2) opacity(0.9)'
                }}
              />
            </Link>
            <button
              onClick={toggleMenu} // This button opens the menu
              className={`flex items-center justify-center transition-colors duration-200 touch-manipulation p-2 -m-2 ${
                variant === 'dark' 
                  ? 'text-white hover:opacity-80 active:opacity-60' 
                  : 'text-gray-800 hover:text-gray-600 active:text-gray-400'
              }`}
              aria-label="Abrir menu de navegação"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon size={isMobile ? 28 : 32} />
            </button>
          </div>
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