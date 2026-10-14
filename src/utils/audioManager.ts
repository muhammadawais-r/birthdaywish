/**
 * Web Audio API ambient birthday chime generator.
 * Provides a gentle, nostalgic music-box melody without needing external network files.
 * Starts OFF by default and responds to user interaction.
 */

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  // Gentle music-box notes (Frequencies for Happy Birthday motif in C Major)
  private melody: { freq: number; duration: number }[] = [
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 261.63, duration: 0.3 }, // C4
    { freq: 293.66, duration: 0.6 }, // D4
    { freq: 261.63, duration: 0.6 }, // C4
    { freq: 349.23, duration: 0.6 }, // F4
    { freq: 329.63, duration: 0.9 }, // E4
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 261.63, duration: 0.3 }, // C4
    { freq: 293.66, duration: 0.6 }, // D4
    { freq: 261.63, duration: 0.6 }, // C4
    { freq: 392.00, duration: 0.6 }, // G4
    { freq: 349.23, duration: 0.9 }, // F4
  ];

  private noteIndex = 0;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Sine wave for sweet, soft music box chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Soft envelope
      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration + 0.05);
    } catch {
      // Audio context policy safe guard
    }
  }

  public playChimeSequence() {
    if (!this.isPlaying) return;
    const note = this.melody[this.noteIndex];
    this.playTone(note.freq, note.duration);
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
  }

  public start() {
    this.initContext();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.playChimeSequence();

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.playChimeSequence();
    }, 700);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const audioManager = new AudioManager();
