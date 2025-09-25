'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import FullScreenNav from '@/components/custom/FullScreenNav';

const HeaderRevised = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobile detection for optimal logo sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'home', label: 'HOME', href: '/', imageSrc: '/images/hero-home.jpg' },
    { id: 'servicos', label: 'SERVIÇOS', href: '/servicos', imageSrc: '/images/hero-services.jpg' },
    {
      id: 'sobre',
      label: 'SOBRE',
      href: '#',
      imageSrc: '/images/hero-about.jpg',
      subMenu: [
        { id: 'sobre-gabardo', label: 'SOBRE A GABARDO', href: '/sobre' },
        { id: 'secao-institucional', label: 'SEÇÃO INSTITUCIONAL', href: '/sobre/secao-institucional' },
        { id: 'conformidade-lgpd', label: 'CONFORMIDADE E LGPD', href: '/sobre/conformidade-e-lgpd' },
        { id: 'historia', label: 'HISTÓRIA', href: '/sobre/historia' },
      ],
    },
    { id: 'sustentabilidade', label: 'SUSTENTABILIDADE', href: '/sustentabilidade', imageSrc: '/images/gabardo-hero-01.JPG' },
    { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/images/hero-blog.jpg' },
    {
      id: 'nossa-gente',
      label: 'NOSSA GENTE',
      href: '#',
      imageSrc: '/images/hero-people.jpg',
      subMenu: [
        { id: 'trabalhe-conosco', label: 'TRABALHE CONOSCO', href: '/trabalhe-conosco' },
        { id: 'programas', label: 'PROGRAMAS', href: '/programas' },
        { id: 'seja-um-agregado', label: 'SEJA UM AGREGADO', href: '/nossa-gente/seja-um-agregado' },
      ],
    },
    { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: '/images/hero-contact.jpg' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 z-30">
      <div className="w-full px-6 md:px-12 lg:px-16 py-4 md:py-6">
        <div className="flex justify-between items-center w-full">
          <Link 
            href="/" 
            className="flex items-center text-xl font-medium tracking-wide touch-manipulation font-primary"
            aria-label="Gabardo Distribuidora - Página inicial"
          >
            <Image
              src="/gabardo-logo.png"
              alt="Gabardo Logo"
              width={isMobile ? 100 : 120}
              height={isMobile ? 32 : 38}
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
          
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              variant === 'dark' 
                ? 'text-white hover:bg-white/10' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Full Screen Navigation */}
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
      />
    </div>
  );
};

export { HeaderRevised as Header };