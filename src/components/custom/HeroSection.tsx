import { Dot, Mouse } from 'lucide-react';

const ScrollDownIcon = () => (
  <div className="flex flex-col items-center space-y-2">
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Role para baixo
    </span>
  </div>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" /> {/* Adjusted arrow to better match V shape from image corner*/}
  </svg>
);

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Vídeo_Coworking_Moderno_Gerado.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Overlay for better text contrast */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        {/* Top spacer for header, or header can be outside this component and positioned absolutely */}
        <div></div> {/* This div is a placeholder if header spacing is managed here, currently header is absolute so it's fine*/}

        {/* Left Scroll Indicator - positioned absolutely relative to this container */}
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Text & Bottom Arrow Container */}
        {/* The outer div handles bottom positioning via justify-between on parent and flex-col */}
        <div className="flex flex-col justify-end h-full">
          {/* This row contains the spacer, text, and arrow */}
          <div className="flex items-end w-full mb-16 md:mb-8">
            {/* Spacer to push text away from left edge / scroll indicator.
                Scroll indicator is left-8 (2rem from p-8 edge) / left-16 (4rem from p-16 edge).
                Icon width is w-8 (2rem).
                Desired clearance from scroll icon:
                Small screens: left-padding-of-parent (p-8) + scroll_icon_left (8px / 0.5rem in tailwind terms, actual 2rem from viewport edge effectively)
                               + scroll_icon_width (w-8 / 2rem) + buffer (e.g. 2rem).
                               The spacer is *inside* the p-8/p-16. So it should account for where the scroll icon is relative to this inner flow.
                               If scroll icon is left-8 (from content box edge), and w-8 wide, it occupies up to left-16 (4rem).
                               Let's use w-20 (5rem) on smallest, md:w-24 (6rem), lg:w-28 (7rem) for the spacer.
                               This is relative to the start of the flex container which is already padded by p-8/p-16.
                               The scroll icon itself is `left-8` (from the `p-8` boundary) so it starts 2rem in. Its width is 2rem. It ends 4rem in.
                               A spacer of `w-20` (5rem) should provide a 1rem gap.
                               On `md`: `left-16` (4rem in). Width 2rem. Ends 6rem in. `md:w-24` (6rem) spacer would be flush. Needs to be larger.
                               Let's try: `w-24` (6rem) for sm, `md:w-32` (8rem) for md+.
            */}
            <div className="flex-shrink-0 w-24 md:w-32"></div>

            {/* Text Content Block */}
            <div className="flex-grow max-w-4xl xl:max-w-5xl">
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight">
                A Maior rede de Coworking, Escritórios Flexíveis e Salas de Reunião em Recife
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-lg lg:text-xl font-light leading-relaxed">
                Ambientes de trabalho inspiradores e produtivos para você e sua equipe.
              </p>
            </div>

            {/* Arrow Icon, aligned to the far right */}
            <div className="hidden md:block md:ml-auto pl-4 md:pl-8">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 