'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SimpleNavbar from '@/components/custom/SimpleNavbar';

const HeaderRevised = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
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

  return (
    <div className="absolute top-0 left-0 right-0 z-30">
      {/* Minimal navbar with transparent background */}
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
          
          <SimpleNavbar variant={variant} />
        </div>
      </div>
    </div>
  );
};

export { HeaderRevised as Header };