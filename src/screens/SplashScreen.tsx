import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
  onOpenAccessibility: () => void;
  backgroundImage: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  onOpenAccessibility,
  backgroundImage,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Image & Scrim Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt="Senhora idosa praticando musculação funcional"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-transparent pointer-events-none h-32"></div>
      </div>

      {/* Decorative Brand SVG Waves */}
      <svg
        className="absolute top-[-20px] left-[-20px] w-52 h-52 pointer-events-none z-10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M-10 160 C 50 140, 110 90, 80 -10 L -10 -10 Z" fill="url(#grad-top-1)" opacity="0.85" />
        <path d="M-10 130 C 60 110, 80 50, 40 -10 L -10 -10 Z" fill="url(#grad-top-2)" opacity="0.9" />
        <defs>
          <linearGradient id="grad-top-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ae000" />
            <stop offset="60%" stopColor="#14530c" />
            <stop offset="100%" stopColor="#021a02" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-top-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#88F000" />
            <stop offset="70%" stopColor="#0c3805" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-[-15px] right-[-25px] w-64 h-56 pointer-events-none z-10"
        viewBox="0 0 240 200"
        fill="none"
      >
        <path d="M30 220 C 70 140, 150 110, 260 90 L 260 220 Z" fill="url(#grad-bot-1)" opacity="0.85" />
        <path d="M70 220 C 120 150, 180 130, 260 120 L 260 220 Z" fill="url(#grad-bot-2)" opacity="0.95" />
        <defs>
          <linearGradient id="grad-bot-1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7AE000" />
            <stop offset="50%" stopColor="#14530c" />
            <stop offset="100%" stopColor="#021402" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-bot-2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#88F000" />
            <stop offset="60%" stopColor="#0e3d06" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Branding & Headline */}
      <div className="relative z-20 px-6 pt-10 flex flex-col justify-start">
        {/* LOGO: 60+ FIT */}
        <div className="mb-6">
          <div className="flex items-baseline tracking-tight font-black italic">
            <span className="text-white text-6xl tracking-tighter drop-shadow-md">60</span>
            <span className="text-[#88F000] text-5xl -ml-1 mr-1 align-super drop-shadow-md">+</span>
            <span className="text-[#88F000] text-6xl tracking-normal ml-0.5 drop-shadow-md">FIT</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-[2px] bg-[#88F000]"></div>
            <span className="text-[10px] tracking-[0.16em] uppercase font-bold text-white whitespace-nowrap">
              Musculação e Funcionalidade
            </span>
            <div className="w-4 h-[2px] bg-[#88F000]"></div>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-[280px] text-shadow-hero">
          <h1 className="text-[28px] sm:text-[30px] leading-[1.22] font-extrabold italic text-white">
            Mais saúde,<br />
            força e<br />
            <span className="text-[#88F000] font-black">independência</span><br />
            para o seu<br />
            dia a dia!
          </h1>
        </div>
      </div>

      {/* Bottom Call to Action Section */}
      <div className="relative z-20 px-6 pb-6 flex flex-col items-center">
        {/* Main Action Button */}
        <button
          onClick={onStart}
          aria-label="Começar treino no app 60+ FIT"
          className="btn-action-gradient w-full max-w-[340px] py-4 px-6 rounded-full flex items-center justify-center space-x-3.5 transition-all duration-200 cursor-pointer shadow-xl active:scale-[0.98]"
        >
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
            <ArrowRight className="w-4 h-4 text-[#88F000] stroke-[3]" />
          </div>
          <span className="text-black font-extrabold text-lg tracking-wider uppercase pl-0.5">
            COMEÇAR
          </span>
        </button>

        {/* Accessibility Button */}
        <button
          onClick={onOpenAccessibility}
          aria-label="Opções de Acessibilidade"
          className="mt-4 flex items-center space-x-2 text-white/95 hover:text-white transition-opacity py-1 px-3 rounded-md active:scale-95"
        >
          <div className="w-6 h-6 rounded-full border-[1.8px] border-[#88F000] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#88F000] fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="4.5" r="2.2"></circle>
              <path d="M19 8.5H5c-.6 0-1 .4-1 1s.4 1 1 1h4v11c0 .6.4 1 1 1s1-.4 1-1v-6h2v6c0 .6.4 1 1 1s1-.4 1-1v-11h4c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-wide">Acessibilidade</span>
        </button>
      </div>
    </div>
  );
};
