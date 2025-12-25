
import React, { useEffect, useState } from 'react';
import { MaslowLevel } from '../types';

interface MaslowPyramidProps {
  scores: Record<MaslowLevel, number>;
  dominant: MaslowLevel;
}

export const MaslowPyramid: React.FC<MaslowPyramidProps> = ({ scores, dominant }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(t);
  }, []);

  const levels: { id: MaslowLevel; label: string; color: string }[] = [
    { id: 'actualization', label: 'Самореализация', color: 'from-yellow-400 to-amber-600' },
    { id: 'esteem', label: 'Уважение', color: 'from-orange-400 to-red-600' },
    { id: 'belonging', label: 'Причастность', color: 'from-pink-400 to-purple-600' },
    { id: 'safety', label: 'Безопасность', color: 'from-blue-400 to-indigo-600' },
    { id: 'physiology', label: 'Физиология', color: 'from-green-400 to-teal-600' },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex flex-col justify-end items-center gap-1.5 p-4">
      {levels.map((level, idx) => {
        const isDominant = level.id === dominant;
        const width = 30 + (4 - idx) * 15; // 30% to 90%
        const score = scores[level.id];
        const opacity = score > 0 ? (isDominant ? 1 : 0.6) : 0.2;

        return (
          <div
            key={level.id}
            className={`relative flex items-center justify-center transition-all duration-1000 ease-out border border-white/10 overflow-hidden
              ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
            style={{
              width: `${width}%`,
              height: '16%',
              opacity: opacity,
              transitionDelay: `${(4 - idx) * 200}ms`,
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
              backgroundColor: isDominant ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Fill Progress based on score (max possible per level is 9 usually, but let's assume 3-5 is high) */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${level.color} transition-all duration-[2000ms]`}
              style={{ 
                width: animate ? `${Math.min(100, (score / 4) * 100)}%` : '0%',
                opacity: isDominant ? 0.8 : 0.4
              }}
            />
            
            <span className={`relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-widest ${isDominant ? 'text-white' : 'text-gray-400'}`}>
              {level.label}
            </span>
            
            {isDominant && (
               <div className="absolute inset-0 ring-2 ring-inset ring-yellow-400/50 animate-pulse pointer-events-none"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
