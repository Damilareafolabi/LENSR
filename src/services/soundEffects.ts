// Procedural Web Audio API sound synthesizer for camera and UI feedback
class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Realistic DSLR two-phase shutter sound: mirror slap up, curtain exposure, mirror slap down
  public playShutterClick(speedSeconds: number = 0.01): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Phase 1: Mirror flip up (snappy thud)
    const mirrorOsc = ctx.createOscillator();
    const mirrorGain = ctx.createGain();
    mirrorOsc.type = 'triangle';
    mirrorOsc.frequency.setValueAtTime(140, now);
    mirrorOsc.frequency.exponentialRampToValueAtTime(45, now + 0.04);

    mirrorGain.gain.setValueAtTime(0.4, now);
    mirrorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    mirrorOsc.connect(mirrorGain);
    mirrorGain.connect(ctx.destination);

    mirrorOsc.start(now);
    mirrorOsc.stop(now + 0.06);

    // Shutter curtain transient noise
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2200, now + 0.01);
    noiseFilter.Q.setValueAtTime(3, now + 0.01);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, now + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now + 0.01);

    // Phase 2: Mirror return & mechanical reset
    const returnDelay = Math.min(Math.max(speedSeconds, 0.06), 0.35);
    const returnTime = now + returnDelay;

    const resetOsc = ctx.createOscillator();
    const resetGain = ctx.createGain();
    resetOsc.type = 'sine';
    resetOsc.frequency.setValueAtTime(220, returnTime);
    resetOsc.frequency.exponentialRampToValueAtTime(60, returnTime + 0.05);

    resetGain.gain.setValueAtTime(0.3, returnTime);
    resetGain.gain.exponentialRampToValueAtTime(0.001, returnTime + 0.06);

    resetOsc.connect(resetGain);
    resetGain.connect(ctx.destination);

    resetOsc.start(returnTime);
    resetOsc.stop(returnTime + 0.07);
  }

  // Tactile dial tick (for aperture/shutter dials)
  public playDialTick(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  }

  // Camera Autofocus Lock double-beep
  public playFocusBeep(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First chirp
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1760, now); // A6 note
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Second chirp
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1760, now + 0.07);
    gain2.gain.setValueAtTime(0.15, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.11);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.12);
  }

  // Celebratory reward chime for completing a step / tiny win
  public playSuccessChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }
}

export const sounds = new SoundSynthesizer();
