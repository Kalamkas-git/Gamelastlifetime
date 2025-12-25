
import React from 'react';
import { GameStats } from '../types';

interface ClockHUDProps {
  hour: number;
  stats: GameStats;
}

export const ClockHUD: React.FC<ClockHUDProps> = ({ hour }) => {
  const rotation = (hour / 24) * 360;

  return (
    <div className="relative w-full mx-auto h-auto min-h-[120px] md:min-h-[180px] flex items-center justify-center pointer-events-none select-none py-4">
      {/* CENTRAL DIAL ONLY */}
      <div className="relative flex-shrink-0 scale-90 sm:scale-100 md:scale-110">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#0a0a0d] shadow-[0_0_50px_rgba(0,0,0,1),_inset_0_0_20px_rgba(212,175,55,0.05)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 rounded-full border-[2px] md:border-[4px] border-[#3a2a1a] ring-1 ring-[#d4af37]/20"></div>
          
          {/* Pulsing Core */}
          <div className="absolute inset-[30%] bg-[#d4af37]/5 rounded-full blur-2xl animate-pulse"></div>

          {/* Static Gears Background */}
          <div className="absolute inset-0 opacity-15">
             <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" className="text-[#d4af37]"/>
             </svg>
          </div>

          {/* The Pointer Hand */}
          <div 
            className="absolute w-0.5 h-[42%] bg-gradient-to-t from-transparent via-[#d4af37] to-white origin-bottom bottom-1/2 transition-transform duration-1000 ease-in-out z-20"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#d4af37] rotate-45 border border-white/50 shadow-[0_0_10px_#d4af37]"></div>
          </div>
          
          {/* Center Cap */}
          <div className="absolute w-3 h-3 rounded-full bg-[#1a1a1a] border border-[#d4af37] z-30 shadow-lg"></div>

          {/* Digital Time Overlay */}
          <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-sm border border-[#d4af37]/30 px-3 py-0.5 rounded">
             <span className="text-[10px] md:text-xs font-mono text-[#d4af37] tracking-[0.2em] font-bold">
               {hour.toString().padStart(2, '0')}:00
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};
