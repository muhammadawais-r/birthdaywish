import React from 'react';
import { Sparkles, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface CelebrationSceneProps {
  onReplay: () => void;
}

export const CelebrationScene: React.FC<CelebrationSceneProps> = ({ onReplay }) => {
  const { celebration } = BIRTHDAY_DATA;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center animate-fade-in">
      {/* Eyebrow */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-xs font-mono font-bold tracking-wider text-pink-600 uppercase">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>MISSION STATUS: ACCOMPLISHED</span>
      </div>

      {/* Hero Celebration Headline */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
          HAPPY BIRTHDAY, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
            ZYAN JIGRI!
          </span>
        </h1>
      </div>

      {/* Sincere Affirmation Statements */}
      <div className="mt-10 w-full max-w-2xl mx-auto space-y-3.5 text-left">
        {celebration.statements.map((statement, idx) => {
          const isReplyJoke = idx === 2;
          const isFinalQuote = idx === 3;

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                isFinalQuote
                  ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-300 shadow-md'
                  : isReplyJoke
                  ? 'bg-pink-50/70 border-pink-200 shadow-xs'
                  : 'bg-white/90 border-pink-200/80 shadow-xs'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                {isFinalQuote ? (
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-pink-600" />
                )}
              </div>
              <p
                className={`text-base sm:text-lg ${
                  isFinalQuote
                    ? 'font-bold text-[#2e1b24] font-["Outfit",sans-serif]'
                    : isReplyJoke
                    ? 'font-medium text-pink-900 italic'
                    : 'font-medium text-[#3d2733]'
                }`}
              >
                {statement}
              </p>
            </div>
          );
        })}
      </div>

      {/* Replay The Experience Button */}
      <div className="mt-12 flex flex-col items-center">
        <button
          type="button"
          onClick={onReplay}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-white group-hover:-rotate-90 transition-transform duration-300" />
          <span>{celebration.replayButtonLabel}</span>
        </button>
      </div>

      {/* Footer attribution */}
      <div className="mt-14 pt-8 border-t border-pink-200/60 w-full max-w-lg mx-auto text-xs text-[#7c636f] font-mono">
        <p>{celebration.footerText}</p>
      </div>
    </div>
  );
};
