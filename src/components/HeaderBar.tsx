import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

interface HeaderBarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  currentScene: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 border-b border-pink-200/60 bg-white/40 backdrop-blur-md">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center border border-pink-300/60 text-pink-500 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-500" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#2e1b24] font-['Outfit',sans-serif]">
          The Introvert Experience
        </span>
      </div>

      {/* Zone 2: Editorial breadcrumb / recipient info */}
      <div className="hidden md:flex items-center gap-2 text-xs text-[#7c636f] tracking-wide font-mono">
        <span>FOR: ZYAN JIGRI</span>
        <span aria-hidden="true" className="text-pink-300 font-bold">·</span>
        <span className="text-pink-600 font-semibold">THE SPECIAL BIRTHDAY MISSION</span>
      </div>

      {/* Zone 3: Sound toggle action */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Turn on background music' : 'Mute music'}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-200 bg-white/80 hover:bg-pink-50 hover:border-pink-300 text-xs font-medium text-[#4a303e] shadow-xs transition-colors cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-pink-800">Music Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-pink-700 font-semibold">Music Playing</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
