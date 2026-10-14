import React, { useState } from 'react';
import { Clock, RefreshCw, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface ConfessionSceneProps {
  onContinue: () => void;
}

export const ConfessionScene: React.FC<ConfessionSceneProps> = ({ onContinue }) => {
  const { confession } = BIRTHDAY_DATA;
  const [isForgiven, setIsForgiven] = useState(false);
  const [restartRotated, setRestartRotated] = useState(false);

  const handleForgive = () => {
    setIsForgiven(true);
    setTimeout(() => {
      onContinue();
    }, 1400);
  };

  const handleSpinClock = () => {
    setRestartRotated(true);
    setTimeout(() => setRestartRotated(false), 800);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
      {/* Eyebrow badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-xs font-mono font-semibold tracking-wider text-pink-600 uppercase">
        <Clock className="w-3.5 h-3.5 text-pink-500" />
        <span>{confession.eyebrow}</span>
      </div>

      {/* Clock & Restart Visual Object */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Soft pink bloom */}
        <div className="absolute w-44 h-44 rounded-full bg-pink-200/50 blur-2xl pointer-events-none" />

        {/* Outer calendar ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white border-2 border-pink-200 shadow-[0_10px_30px_rgba(236,72,153,0.15)] flex flex-col items-center justify-center p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-pink-400 uppercase tracking-widest border-b border-pink-100 pb-1 w-full justify-center">
            <span>BELATED</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span>ALERT</span>
          </div>

          <div
            onClick={handleSpinClock}
            role="button"
            tabIndex={0}
            aria-label="Restart time sync"
            className="my-auto cursor-pointer group flex flex-col items-center justify-center"
          >
            <Clock
              className={`w-10 h-10 text-pink-500 transition-transform duration-700 ${
                restartRotated ? 'rotate-[360deg]' : 'group-hover:rotate-45'
              }`}
            />
            <span className="text-[10px] font-mono text-pink-400 mt-1 flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5" /> tap to sync
            </span>
          </div>
        </div>
      </div>

      {/* Confession Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
        {confession.mainTitle}
      </h2>

      {/* Confession Body Cards */}
      <div className="mt-6 max-w-2xl mx-auto space-y-4">
        <div className="p-6 rounded-2xl bg-white/90 border border-pink-200/80 shadow-[0_4px_20px_rgba(244,114,182,0.06)] text-left space-y-3">
          <p className="text-base sm:text-lg text-[#3d2733] font-medium leading-relaxed">
            {confession.paragraphs[0]}
          </p>
          <p className="text-base sm:text-lg font-bold text-pink-600 leading-relaxed font-['Outfit',sans-serif]">
            {confession.paragraphs[1]}
          </p>
        </div>

        {/* Humorous line */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs sm:text-sm text-pink-800 font-mono">
          <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
          <span>{confession.humorousNote}</span>
        </div>
      </div>

      {/* Forgiveness Action Button */}
      <div className="mt-8 flex flex-col items-center">
        {!isForgiven ? (
          <button
            type="button"
            onClick={handleForgive}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-pink-100" />
            <span>{confession.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="animate-bounce inline-flex items-center gap-3 px-6 py-3 rounded-full bg-pink-100 border border-pink-300 text-pink-800 font-mono text-sm font-bold shadow-md">
            <span>🎉 Forgiveness Accepted! Proceeding to Roast...</span>
          </div>
        )}
      </div>
    </div>
  );
};
