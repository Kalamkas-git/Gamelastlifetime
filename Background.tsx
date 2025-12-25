
import React, { useMemo } from 'react';

interface BackgroundProps {
  hour: number; // 1 to 24
  keyword?: string; // Keep for compatibility but strictly use hour for visuals
}

export const Background: React.FC<BackgroundProps> = ({ hour }) => {
  
  // Определяем фазу дня для цветов градиента
  const getGradient = (h: number) => {
    // Утро (6-10) - Deep Orange/Purple
    if (h >= 5 && h <= 10) return "from-[#2c1a3d] via-[#4a2c2c] to-[#d48c37]";
    // День (11-16) - Teal/Blue but deeper for contrast
    if (h >= 11 && h <= 16) return "from-[#0f172a] via-[#1e293b] to-[#0891b2]";
    // Вечер/Закат (17-20) - Violet/Red
    if (h >= 17 && h <= 20) return "from-[#1a0b2e] via-[#31111d] to-[#b91c1c]";
    // Ночь (21-4) - Deep Void
    return "from-[#050505] via-[#0a0a12] to-[#11111f]";
  };

  const getCelestialBodyPosition = (h: number) => {
    const isDay = h >= 6 && h <= 18;
    const startHour = isDay ? 6 : 19;
    const totalHours = isDay ? 12 : 10; 
    
    let current = h - startHour;
    if (current < 0) current += 24; 
    
    const percentage = (current / totalHours) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));

    const yPos = 100 - (100 * Math.sin((clamped / 100) * Math.PI)); 

    return { 
      left: `${clamped}%`, 
      top: `${yPos * 0.4 + 10}%`, // Flattened arc, keep high
      isSun: isDay 
    };
  };

  const gradientClass = getGradient(hour);
  const celestial = getCelestialBodyPosition(hour);

  const stars = useMemo(() => {
    if (hour >= 6 && hour <= 18) return [];
    
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        top: Math.random() * 60 + '%',
        left: Math.random() * 100 + '%',
        size: Math.random() * 2 + 1 + 'px',
        opacity: Math.random(),
        animDelay: Math.random() * 3 + 's'
      });
    }
    return arr;
  }, [hour]);

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-[2000ms] ease-in-out bg-gradient-to-b ${gradientClass}`}>
      
      {/* Noise Texture for "Paper/Film" feel */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Celestial Body (Sun/Moon) */}
      <div 
        className={`absolute w-32 h-32 rounded-full blur-2xl transition-all duration-[2000ms] ease-in-out transform -translate-x-1/2 -translate-y-1/2
          ${celestial.isSun ? 'bg-[#d4af37] opacity-60' : 'bg-[#e5e5e5] opacity-20'}
        `}
        style={{ left: celestial.left, top: celestial.top }}
      />
      
      {/* Physical Orb */}
      <div 
        className={`absolute w-12 h-12 rounded-full transition-all duration-[2000ms] ease-in-out transform -translate-x-1/2 -translate-y-1/2 shadow-2xl
          ${celestial.isSun ? 'bg-gradient-to-br from-[#fcd34d] to-[#b45309]' : 'bg-gradient-to-br from-[#f3f4f6] to-[#6b7280]'}
        `}
        style={{ left: celestial.left, top: celestial.top }}
      />

      {/* Stars Layer */}
      {stars.map((star, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animDelay
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-60" />
    </div>
  );
};
