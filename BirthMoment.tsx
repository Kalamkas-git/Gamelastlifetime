
import React, { useEffect, useState } from 'react';

interface BirthMomentProps {
  onComplete: () => void;
}

export const BirthMoment: React.FC<BirthMomentProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-serif select-none">
      
      {/* Background Atmosphere - Fog/Mystic scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#050505] to-[#0a0a0a] z-0"></div>
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] z-5"></div>

      <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[2500ms] ${visible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Title: Moment of Birth */}
        <div className="mb-16 text-center space-y-4 px-6">
           <span className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]/60 block animate-pulse">Момент рождения</span>
           <h2 className="text-xl md:text-2xl text-[#ffe4b5] font-light italic opacity-80 max-w-md mx-auto leading-relaxed">
             "Стрелка запущена. Время — ваш главный ресурс."
           </h2>
        </div>

        {/* The Dial of Being (Vertical-ish scroller style or round) */}
        <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] mb-16 flex items-center justify-center">
           {/* Pulsing Aura */}
           <div className="absolute inset-0 rounded-full bg-[#d4af37]/5 blur-[100px] animate-pulse-slow"></div>
           
           {/* SVG Clock */}
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              {/* Scale marks 0-100 */}
              <circle cx="100" cy="100" r="98" fill="none" stroke="#5c4033" strokeWidth="0.5" opacity="0.3" />
              {[...Array(24)].map((_, i) => (
                <line 
                  key={i}
                  x1="100" y1="10" x2="100" y2={i % 6 === 0 ? "20" : "15"}
                  stroke={i % 6 === 0 ? "#d4af37" : "#5c4033"}
                  strokeWidth={i % 6 === 0 ? "1" : "0.5"}
                  transform={`rotate(${i * 15} 100 100)`}
                />
              ))}

              {/* The Hand - Launching */}
              <g className="origin-center">
                 <line x1="100" y1="100" x2="100" y2="25" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" className="shadow-lg">
                    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="120s" repeatCount="indefinite" />
                 </line>
                 <circle cx="100" cy="100" r="4" fill="#d4af37" className="animate-pulse" />
              </g>
           </svg>

           {/* Central Text Overlay */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37]/40 font-sans mb-1">Начало</div>
                <div className="text-2xl md:text-3xl font-mono text-[#d4af37] font-bold">00:00</div>
              </div>
           </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => { setVisible(false); setTimeout(onComplete, 1200); }}
          className="group relative px-12 py-5 bg-transparent border border-[#d4af37]/20 text-[#d4af37] text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-[#d4af37] hover:text-black transition-all duration-700 rounded-sm"
        >
          <span>ЗАПУСТИТЬ ЖИЗНЬ</span>
          {/* Subtle line beneath */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-700"></div>
        </button>

      </div>
    </div>
  );
};
