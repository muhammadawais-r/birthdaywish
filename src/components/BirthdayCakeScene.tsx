import React, { useState } from 'react';
import { Sparkles, Wind, ArrowRight, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface BirthdayCakeSceneProps {
  onContinue: () => void;
}

export const BirthdayCakeScene: React.FC<BirthdayCakeSceneProps> = ({ onContinue }) => {
  const { cake } = BIRTHDAY_DATA;
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const [isDimmed, setIsDimmed] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleBlowCandles = () => {
    if (isBlown) return;

    // 1. Extinguish flames
    setIsBlown(true);

    // 2. Briefly dim the scene
    setIsDimmed(true);

    // 3. Pause for a moment, then restore light and trigger celebratory particles
    setTimeout(() => {
      setIsDimmed(false);
      setShowConfetti(true);
    }, 900);
  };

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-700 ${
        isDimmed ? 'brightness-50 filter blur-[0.5px]' : 'brightness-100'
      }`}
    >
      {/* Eyebrow */}
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-xs font-mono font-bold tracking-wider text-pink-600 uppercase">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>TRADITIONAL RITUAL PROTOCOL</span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
        {cake.title}
      </h2>
      <p className="mt-2 text-base sm:text-lg text-pink-600 font-semibold tracking-wide font-['Outfit',sans-serif]">
        {cake.instruction}
      </p>

      {/* The Aesthetic Pink & Cream Birthday Cake */}
      <div className="relative my-10 flex flex-col items-center">
        {/* Soft pink candle lighting ambient halo */}
        <div
          className={`absolute -top-10 w-48 h-48 rounded-full transition-all duration-700 pointer-events-none ${
            !isBlown ? 'bg-amber-300/30 blur-2xl scale-110' : 'bg-transparent scale-75'
          }`}
        />

        {/* 3 Candles with Flickering Flames */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-10">
          {[1, 2, 3].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center">
              {/* Flame */}
              {!isBlown ? (
                <div className="relative flex flex-col items-center mb-1">
                  <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#f59e0b] animate-flicker" />
                  <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs" />
                </div>
              ) : (
                /* Extinguished smoke wisp */
                <div className="h-6 flex items-center justify-center mb-1">
                  <div className="w-1.5 h-3 bg-slate-400/40 rounded-full blur-[1px] animate-pulse" />
                </div>
              )}
              {/* Candle Body */}
              <div
                className={`w-3.5 rounded-t-sm shadow-sm ${
                  candleIndex === 2
                    ? 'h-14 bg-gradient-to-b from-pink-200 to-pink-400'
                    : 'h-11 bg-gradient-to-b from-amber-100 to-pink-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="relative z-0 w-48 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-b from-white via-pink-50 to-pink-100 border-2 border-pink-200 shadow-md flex items-center justify-center overflow-hidden">
          {/* White cream swirls */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 border-b border-pink-200/50 flex justify-around px-2">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-pink-300 -mt-1 shadow-xs" />
            ))}
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-pink-500 mt-2">
            ZYAN · 2026
          </span>
        </div>

        {/* Cake Tier 2 (Bottom) */}
        <div className="relative z-0 w-64 sm:w-72 h-20 rounded-b-3xl bg-gradient-to-b from-pink-100 via-pink-200 to-rose-200 border-2 border-pink-300 shadow-xl flex items-center justify-center overflow-hidden -mt-1">
          {/* Decorative piped icing */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/80 border-b border-pink-200/60 flex justify-around px-3">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="w-3 h-3 rounded-full bg-pink-400 -mt-1 shadow-xs" />
            ))}
          </div>
          <span className="text-sm font-['Cinzel',serif] font-black tracking-widest text-[#2e1b24] mt-3">
            HAPPY BIRTHDAY
          </span>
        </div>

        {/* Cake Pedestal Stand */}
        <div className="w-72 sm:w-80 h-3.5 rounded-full bg-white border border-pink-200 shadow-lg mt-1" />
        <div className="w-24 h-4 bg-gradient-to-b from-slate-100 to-pink-100 rounded-b-lg border-x border-b border-pink-200 -mt-0.5" />
      </div>

      {/* Primary Action: Blow out candles */}
      {!isBlown ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleBlowCandles}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Wind className="w-5 h-5 text-white" />
            <span>{cake.actionLabel}</span>
          </button>
          <p className="text-xs text-[#7c636f] font-mono mt-3">
            (No microphone needed — just tap with intention)
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-5 animate-fade-in">
          {/* Confetti & Wish revealed */}
          <div className="p-6 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-[0_10px_30px_rgba(236,72,153,0.15)] max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>CANDLES EXTINGUISHED · WISH REGISTERED</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-[#2e1b24] font-['Outfit',sans-serif]">
              "{cake.wishedMessage}"
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={onContinue}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
              <span>UNVEIL FINAL CELEBRATION</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Confetti Elements if blown */}
      {showConfetti && (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-sm ${
                i % 3 === 0 ? 'bg-pink-400' : i % 2 === 0 ? 'bg-rose-400' : 'bg-amber-300'
              }`}
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 70}%`,
                width: `${4 + (i % 4) * 2}px`,
                height: `${8 + (i % 3) * 4}px`,
                transform: `rotate(${i * 24}deg)`,
                opacity: 0.8,
                animation: `pulseGlow ${2 + (i % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
