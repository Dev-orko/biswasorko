"use client";

import { useEffect, useRef } from 'react';

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      ticker.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        ticker.style.transform = 'translate(0, 0)';
      }, 50);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative overflow-hidden border-y-4 border-lime-acid bg-black z-20">
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-lime-acid/5 to-transparent pointer-events-none animate-scan" />
      
      {/* Main Ticker */}
      <div 
        ref={tickerRef}
        className="relative py-8 flex items-center"
        style={{ transition: 'transform 0.05s' }}
      >
        <div className="whitespace-nowrap animate-ticker flex items-center gap-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="REACT">REACT</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="NEXT.JS">NEXT.JS</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="TAILWIND CSS">TAILWIND CSS</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="FIGMA">FIGMA</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="AFTER EFFECTS">AFTER EFFECTS</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="TYPESCRIPT">TYPESCRIPT</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="FLUTTER">FLUTTER</span>
              <span className="text-lime-acid text-4xl">●</span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white glitch-ticker tracking-[-0.03em]" data-text="DJANGO">DJANGO</span>
              <span className="text-lime-acid text-4xl">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-noise" />

      <style jsx>{`
        .glitch-ticker {
          position: relative;
          display: inline-block;
        }
        .glitch-ticker::before,
        .glitch-ticker::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.8;
        }
        .glitch-ticker::before {
          color: #D4FF00;
          z-index: -1;
          animation: glitch-1 2s infinite;
        }
        .glitch-ticker::after {
          color: #00ffff;
          z-index: -2;
          animation: glitch-2 3s infinite;
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); opacity: 0; }
          1% { transform: translate(-2px, 2px); opacity: 0.8; }
          2% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); opacity: 0; }
          1.5% { transform: translate(2px, -2px); opacity: 0.6; }
          2.5% { transform: translate(0); opacity: 0; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
