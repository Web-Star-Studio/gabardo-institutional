'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react'; // Renamed to avoid conflict if a Menu component is made later
import FullScreenNav from '@/components/custom/FullScreenNav'; // New menu

const MOCK_FULL_SCREEN_NAV_ITEMS = [
  { id: 'home', label: 'HOME', href: '/', imageSrc: 'https://hubplural.com/wp-content/uploads/2025/05/Captura-de-tela-2025-05-09-220312.png' },
  { id: 'sobre', label: 'SOBRE', href: '/sobre', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-03.png' },
  { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-01.png' },
  { id: 'localizacao', label: 'LOCALIZAÇÃO', href: '/localizacao', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-02.png' },
  { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: 'https://hubplural.com/wp-content/uploads/2023/09/PASSAPORTE-02-1024x770.png' },
];

const HeaderRevised = () => {
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
      <div className="absolute top-0 left-0 right-0 z-30 pt-4 md:pt-6 text-white">
        {/* Increased z-index to 30 to be above hero's overlay (z-20 if any, image is z-10) but below menu (z-40) */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="text-2xl font-semibold tracking-wider touch-manipulation"
              aria-label="Hub Plural - Página inicial"
            >
              <Image
                src="/hub-plural-logo-branca.png"
                alt="Hub Plural Logo"
                width={isMobile ? 140 : 180}
                height={isMobile ? 37 : 48}
                priority
                className="h-auto w-auto"
              />
            </Link>
            <button
              onClick={toggleMenu} // This button opens the menu
              className="text-white hover:opacity-80 active:opacity-60 transition-opacity duration-200 touch-manipulation p-2 -m-2"
              aria-label="Abrir menu de navegação"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon size={isMobile ? 28 : 32} />
            </button>
          </div>
          <div className="mt-4 md:mt-6 h-px bg-white opacity-30"></div>
        </div>
      </div>
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={MOCK_FULL_SCREEN_NAV_ITEMS}
      />
    </>
  );
};

export { HeaderRevised as Header }; 