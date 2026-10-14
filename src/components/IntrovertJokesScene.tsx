import React, { useState } from 'react';
import { BatteryLow, Heart, CheckCircle2, ArrowRight, MessageSquare, Users, ShieldAlert, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface IntrovertJokesSceneProps {
  onContinue: () => void;
}

export const IntrovertJokesScene: React.FC<IntrovertJokesSceneProps> = ({ onContinue }) => {
  const { introvertJokes } = BIRTHDAY_DATA;
  const [activeJokeIndex, setActiveJokeIndex] = useState<number>(0);

  const icons = [
    <BatteryLow key="1" className="w-5 h-5 text-pink-500" />,
    <MessageSquare key="2" className="w-5 h-5 text-rose-500" />,
    <Users key="3" className="w-5 h-5 text-amber-500" />,
    <ShieldAlert key="4" className="w-5 h-5 text-purple-500" />,
  ];

  const handleNextJoke = () => {
    if (activeJokeIndex < introvertJokes.jokes.length - 1) {
      setActiveJokeIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/90 shadow-xs text-xs font-mono font-bold tracking-wider text-pink-600 uppercase">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>INTROVERT BEHAVIOURAL STUDY</span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
        {introvertJokes.title}
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6b4e5f] font-normal">
        {introvertJokes.subtitle}
      </p>

      {/* Dual Battery Meter Widget */}
      <div className="mt-8 w-full max-w-xl mx-auto p-5 rounded-2xl bg-white/90 border border-pink-200/80 shadow-[0_8px_25px_rgba(244,114,182,0.08)] space-y-4">
        {/* Social Battery */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between text-xs font-mono font-semibold">
            <span className="flex items-center gap-2 text-[#4a303e]">
              <BatteryLow className="w-4 h-4 text-pink-500" />
              SOCIAL BATTERY (IN PUBLIC)
            </span>
            <span className="text-pink-600 font-bold">2%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-pink-100 overflow-hidden p-0.5">
            <div className="h-full w-[2%] rounded-full bg-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Friendship Battery */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between text-xs font-mono font-semibold">
            <span className="flex items-center gap-2 text-[#4a303e]">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
              FRIENDSHIP & BROTHERHOOD LEVEL
            </span>
            <span className="text-rose-600 font-bold">100% (MAX)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-pink-100 overflow-hidden p-0.5">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
          </div>
        </div>
      </div>

      {/* Step by Step Joke Cards */}
      <div className="mt-8 w-full max-w-2xl mx-auto space-y-3.5">
        {introvertJokes.jokes.map((joke, idx) => {
          const isRevealed = idx <= activeJokeIndex;
          const isCurrent = idx === activeJokeIndex;

          if (!isRevealed) return null;

          return (
            <div
              key={joke.id}
              className={`p-5 rounded-2xl text-left border transition-all duration-500 ${
                isCurrent
                  ? 'bg-white border-pink-400 shadow-[0_8px_25px_rgba(236,72,153,0.12)] scale-[1.01]'
                  : 'bg-white/70 border-pink-200/60 opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
                  {icons[idx]}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-pink-500">
                      FACT #{idx + 1} · {joke.tag}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#2e1b24] font-['Outfit',sans-serif]">
                    "{joke.quote}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {activeJokeIndex < introvertJokes.jokes.length - 1 && (
          <button
            type="button"
            onClick={handleNextJoke}
            className="px-6 py-3 rounded-full border border-pink-300 bg-white hover:bg-pink-50 text-xs font-mono font-bold text-pink-700 shadow-xs transition-colors cursor-pointer"
          >
            Reveal Next Joke ({activeJokeIndex + 1}/{introvertJokes.jokes.length})
          </button>
        )}

        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>{introvertJokes.buttonLabel}</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
