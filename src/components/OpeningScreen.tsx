import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, Gift, Terminal, FastForward, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  const { introSequence } = BIRTHDAY_DATA;
  const [step, setStep] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const delays = [600, 1100, 1100, 1100, 1200, 1200];

    const advanceStep = (current: number) => {
      if (current < 6) {
        timerRef.current = setTimeout(() => {
          setStep(current + 1);
          advanceStep(current + 1);
        }, delays[current]);
      }
    };

    advanceStep(0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStep(6);
  };

  const handleTriggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 text-center transition-all duration-700 ease-out ${
        isExiting
          ? 'opacity-0 scale-95 filter blur-xs pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Skip option */}
      {step < 6 && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pink-200 bg-white/90 hover:bg-pink-50 text-xs font-mono text-pink-700 hover:text-pink-900 shadow-xs transition-colors cursor-pointer"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-pink-500" />
          </button>
        </div>
      )}

      {/* Top mission beacon */}
      <div
        className={`mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-[11px] font-mono tracking-widest text-pink-700 uppercase transition-all duration-700 ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
        <Terminal className="w-3.5 h-3.5 text-pink-500" />
        <span className="font-semibold">CLASSIFIED BIRTHDAY TRANSMISSION</span>
      </div>

      {/* Central Interactive Mission Object / Gift Capsule (Pink & Cream Luxury Box) */}
      <div className="relative my-3 flex items-center justify-center">
        {/* Soft background ambient glow */}
        <div
          className={`absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-pink-300/30 blur-[60px] transition-all duration-700 pointer-events-none ${
            isHovered ? 'scale-125 bg-pink-400/40' : 'scale-100'
          }`}
        />

        {/* Outer orbital ring */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-pink-200/80 flex items-center justify-center p-3 animate-spin [animation-duration:32s]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#f59e0b]" />
        </div>

        {/* Core Interactive Capsule */}
        <button
          type="button"
          onClick={handleTriggerEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white via-[#fffdfa] to-pink-50 border-2 border-pink-300/80 hover:border-pink-500 shadow-[0_8px_25px_rgba(236,72,153,0.2)] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="Unlock birthday experience gift capsule"
        >
          <div className="relative flex items-center justify-center">
            <Gift className="w-9 h-9 sm:w-11 sm:h-11 text-pink-500 group-hover:text-pink-600 transition-colors" />
            <Sparkles className="absolute -top-1 -right-2 w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <span className="mt-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-pink-700 group-hover:text-pink-900">
            {step >= 6 ? 'Open' : 'Unlock'}
          </span>
        </button>
      </div>

      {/* Terminal Telemetry Sequence */}
      <div className="mt-6 min-h-[104px] max-w-xl mx-auto space-y-2 font-mono text-xs text-[#5f4654] flex flex-col items-center justify-center">
        {introSequence.terminalSteps.map((lineText, idx) => {
          const isRevealed = step >= idx + 1;
          const isLatest = step === idx + 1 && step < 5;

          return (
            <div
              key={idx}
              className={`flex items-center justify-center gap-2 transition-all duration-500 ${
                isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden m-0'
              }`}
            >
              <span className="text-pink-500 font-bold">&gt;</span>
              <span
                className={`${
                  idx === 1
                    ? 'text-[#2e1b24] font-bold text-sm'
                    : idx === 2
                    ? 'text-pink-600 font-semibold'
                    : 'text-[#4a303e]'
                }`}
              >
                {lineText}
              </span>
              {isLatest && (
                <span className="inline-block w-2 h-3.5 bg-pink-500 animate-pulse ml-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Main Heading & Supporting Message */}
      <div
        className={`mt-6 max-w-3xl mx-auto space-y-3 transition-all duration-700 ease-out ${
          step >= 5
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
          Hey,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
            Introvert
          </span>
          . This One Is For You.
        </h1>
        <p className="text-base sm:text-lg text-[#5f4654] max-w-xl mx-auto font-normal leading-relaxed">
          {introSequence.supportingMessage}
        </p>
      </div>

      {/* Primary Action Button */}
      <div
        className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out ${
          step >= 6
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={handleTriggerEnter}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>{introSequence.enterButtonLabel}</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom validation note */}
      <div
        className={`mt-10 flex items-center gap-2 text-xs text-[#8c6d7d] font-mono transition-opacity duration-700 ${
          step >= 6 ? 'opacity-100' : 'opacity-40'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
        <span>AUTHENTICATED FOR ZYAN JIGRI · 100% PERSONALIZED</span>
      </div>
    </div>
  );
};
