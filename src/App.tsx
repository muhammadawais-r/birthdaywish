/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { HeaderBar } from './components/HeaderBar';
import { OpeningScreen } from './components/OpeningScreen';
import { ConfessionScene } from './components/ConfessionScene';
import { IntrovertJokesScene } from './components/IntrovertJokesScene';
import { PhotoGalleryScene } from './components/PhotoGalleryScene';
import { FriendshipLetterScene } from './components/FriendshipLetterScene';
import { BirthdayCakeScene } from './components/BirthdayCakeScene';
import { CelebrationScene } from './components/CelebrationScene';
import { audioManager } from './utils/audioManager';

export type SceneId =
  | 'opening'
  | 'confession'
  | 'jokes'
  | 'gallery'
  | 'letter'
  | 'cake'
  | 'celebration';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('opening');
  const [isMuted, setIsMuted] = useState(true);

  // Scroll to top whenever scene changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleToggleMute = () => {
    const isNowPlaying = audioManager.toggle();
    setIsMuted(!isNowPlaying);
  };

  const handleReplay = () => {
    setCurrentScene('opening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fdfaf6] text-[#2d1c26] overflow-x-hidden flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Pink, Cream & White Ambient Backdrop */}
      <CosmicBackground />

      {/* Top Bar Navigation */}
      <HeaderBar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentScene={currentScene}
      />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        {currentScene === 'opening' && (
          <OpeningScreen onEnter={() => setCurrentScene('confession')} />
        )}

        {currentScene === 'confession' && (
          <ConfessionScene onContinue={() => setCurrentScene('jokes')} />
        )}

        {currentScene === 'jokes' && (
          <IntrovertJokesScene onContinue={() => setCurrentScene('gallery')} />
        )}

        {currentScene === 'gallery' && (
          <PhotoGalleryScene onContinue={() => setCurrentScene('letter')} />
        )}

        {currentScene === 'letter' && (
          <FriendshipLetterScene onContinue={() => setCurrentScene('cake')} />
        )}

        {currentScene === 'cake' && (
          <BirthdayCakeScene onContinue={() => setCurrentScene('celebration')} />
        )}

        {currentScene === 'celebration' && (
          <CelebrationScene onReplay={handleReplay} />
        )}
      </main>

      {/* Clean quiet editorial footer */}
      <footer className="relative z-10 w-full py-6 text-center border-t border-pink-200/60 bg-white/40 backdrop-blur-xs text-xs text-[#7c636f] font-mono">
        <span>Made with love, friendship, and a very late birthday wish.</span>
      </footer>
    </div>
  );
}
