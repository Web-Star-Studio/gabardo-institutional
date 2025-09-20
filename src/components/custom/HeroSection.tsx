'use client';

import { Mouse, ArrowDown } from 'lucide-react';

const ScrollDownIcon = () => (
  <div 
    className="flex flex-col items-center space-y-3 group cursor-pointer"
    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
  >
    <div className="group-hover:text-blue-300 transition-colors duration-300">
      <Mouse className="w-7 h-7" />
    </div>
    <span 
      className="text-xs font-light tracking-widest uppercase group-hover:text-blue-300 transition-colors duration-300" 
      style={{ writingMode: 'vertical-rl' }}
    >
      Role para baixo
    </span>
  </div>
);

const ArrowIcon = () => (
  <div className="group cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-white group-hover:text-blue-300 transition-colors duration-300">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" />
    </svg>
  </div>
);

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Hero Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
        autoPlay
        muted
        loop
        playsInline
        poster="/trucks-hero.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/trucks-hero.jpg)'
          }}
        />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div> {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-blue-900/10"></div> {/* Subtle blue tint */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Top spacer for header, or header can be outside this component and positioned absolutely */}
        <div></div> {/* This div is a placeholder if header spacing is managed here, currently header is absolute so it's fine*/}

        {/* Left Scroll Indicator - positioned absolutely relative to this container */}
        <div className="absolute top-1/2 left-6 sm:left-8 md:left-12 lg:left-16 transform -translate-y-1/2 hidden sm:block">
          <ScrollDownIcon />
        </div>

        {/* Main Text & Bottom Arrow Container */}
        {/* The outer div handles bottom positioning via justify-between on parent and flex-col */}
        <div className="flex flex-col justify-end h-full">
          {/* This row contains the spacer, text, and arrow */}
          <div className="flex items-end w-full mb-16 md:mb-8">
            {/* Spacer for scroll indicator - only on larger screens */}
            <div className="hidden sm:block flex-shrink-0 w-20 md:w-28 lg:w-32"></div>

            {/* Text Content Block */}
            <div className="flex-grow max-w-4xl xl:max-w-5xl">
              <h1 className="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight mb-6">
                Para cada cliente,
                <br />
                <span className="text-blue-accent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  uma Gabardo diferente.
                </span>
              </h1>
              <p className="font-secondary mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-3xl text-gray-100">
                Há mais de 35 anos, entendemos as necessidades dos nossos clientes para atendê-los de forma personalizada e eficiente no transporte de veículos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="font-secondary bg-blue-glow text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 rounded-sm">
                  Encontre seu serviço
                </button>
                <button className="font-secondary border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 rounded-sm backdrop-blur-sm">
                  Seja nosso parceiro
                </button>
              </div>
            </div>

            {/* Arrow Icon, aligned to the far right */}
            <div className="hidden lg:block md:ml-auto pl-4 md:pl-8">
              <ArrowIcon />
            </div>
            
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="sm:hidden flex justify-center mt-8">
            <div
              className="flex flex-col items-center space-y-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <ArrowDown className="w-6 h-6 group-hover:text-blue-300 transition-colors duration-300" />
              <span className="text-xs uppercase tracking-widest group-hover:text-blue-300 transition-colors duration-300">Role</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 