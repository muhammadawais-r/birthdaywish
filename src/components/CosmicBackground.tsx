import React, { useMemo } from 'react';

export const CosmicBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: (i * 27.3) % 100,
      y: (i * 39.7) % 100,
      size: (i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5),
      opacity: 0.25 + ((i % 5) * 0.12),
      delay: (i % 5) * 0.8,
      duration: 4 + (i % 4) * 1.5,
      isPink: i % 2 === 0,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Cream Canvas Background */}
      <div className="absolute inset-0 bg-[#fdfaf6]" />

      {/* Soft Pink and Cream Atmospheric Gradients */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full bg-pink-200/40 blur-[130px]" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[450px] rounded-full bg-rose-200/30 blur-[140px]" />
      <div className="absolute -bottom-20 left-1/3 w-[650px] h-[500px] rounded-full bg-amber-100/50 blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-pink-100/30 blur-[160px]" />

      {/* Floating Rose & Cream Sparkle Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full transition-transform ${
            p.isPink ? 'bg-pink-400' : 'bg-amber-300'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 8px ${p.isPink ? 'rgba(244, 114, 182, 0.6)' : 'rgba(251, 191, 36, 0.4)'}`,
            animation: `pulseGlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Subtle hairline lattice for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489912_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
    </div>
  );
};
