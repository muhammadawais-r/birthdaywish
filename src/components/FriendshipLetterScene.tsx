import React, { useState, useEffect } from 'react';
import { Heart, Cake, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface FriendshipLetterSceneProps {
  onContinue: () => void;
}

export const FriendshipLetterScene: React.FC<FriendshipLetterSceneProps> = ({ onContinue }) => {
  const { letter } = BIRTHDAY_DATA;
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(2);

  // Progressive reveal of paragraphs
  useEffect(() => {
    if (revealedParagraphs < letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedParagraphs((prev) => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [revealedParagraphs, letter.paragraphs.length]);

  const handleRevealAll = () => {
    setRevealedParagraphs(letter.paragraphs.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center">
      {/* Eyebrow */}
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-xs font-mono font-bold tracking-wider text-pink-600 uppercase">
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
        <span>HEARTFELT BROTHERHOOD NOTE</span>
      </div>

      {/* Main Letter Parchment Card */}
      <div className="w-full bg-white/95 rounded-3xl border-2 border-pink-200/90 shadow-[0_15px_45px_rgba(236,72,153,0.1)] p-6 sm:p-10 text-left relative overflow-hidden">
        {/* Subtle decorative wax-seal stamp */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md border-2 border-white">
          <Heart className="w-6 h-6 fill-white" />
        </div>

        {/* Heading */}
        <div className="pr-16 border-b border-pink-100 pb-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
            {letter.heading}
          </h2>
          <span className="text-xs font-mono text-pink-500 font-semibold mt-1 block">
            CONFIDENTIAL · STRICTLY BRO-TO-BRO
          </span>
        </div>

        {/* Letter Paragraphs */}
        <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#3d2733] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-pink-100 selection:text-pink-900">
          {letter.paragraphs.slice(0, revealedParagraphs).map((para, idx) => {
            const isLateNotice = idx === 1;
            const isClosingHighlight = idx === 8;
            const isHeartfeltAppreciation = idx === 9;

            return (
              <p
                key={idx}
                className={`transition-all duration-700 ${
                  isClosingHighlight
                    ? 'font-bold text-lg sm:text-xl text-pink-600 tracking-wide font-["Outfit",sans-serif] pt-2'
                    : isHeartfeltAppreciation
                    ? 'font-semibold text-pink-700 italic border-l-2 border-pink-400 pl-4 py-1'
                    : isLateNotice
                    ? 'text-pink-900/90'
                    : 'text-[#3d2733]'
                }`}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Letter Sign-off */}
        {revealedParagraphs >= letter.paragraphs.length && (
          <div className="mt-8 pt-6 border-t border-pink-100 flex items-center justify-between text-sm sm:text-base font-semibold text-pink-700 font-['Outfit',sans-serif]">
            <span>{letter.closing}</span>
            <span className="text-xs font-mono text-slate-400">{letter.signature}</span>
          </div>
        )}

        {/* Fast Reveal Option */}
        {revealedParagraphs < letter.paragraphs.length && (
          <div className="mt-8 pt-4 border-t border-pink-100 flex justify-end">
            <button
              type="button"
              onClick={handleRevealAll}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-pink-600 hover:text-pink-800 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Show Entire Letter Immediately</span>
            </button>
          </div>
        )}
      </div>

      {/* Button to proceed to Birthday Cake */}
      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Cake className="w-5 h-5 text-white" />
          <span>BLOW OUT THE BIRTHDAY CANDLES</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
