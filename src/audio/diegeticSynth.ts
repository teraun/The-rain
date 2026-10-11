class DiegeticSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentSceneId: number = -1;
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private intervalTimer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  private stopCurrentSounds() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    this.activeNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch {
        // node already stopped
      }
    });
    this.activeNodes = [];
  }

  private createNoiseBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error('No ctx');
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public playSceneSound(sceneId: number) {
    if (!this.ctx || !this.masterGain) return;
    if (this.currentSceneId === sceneId) return;

    this.stopCurrentSounds();
    this.currentSceneId = sceneId;

    const ctx = this.ctx;
    const sceneGain = ctx.createGain();
    sceneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    sceneGain.gain.exponentialRampToValueAtTime(1.0, ctx.currentTime + 0.3);
    sceneGain.connect(this.masterGain);

    const noiseBuffer = this.createNoiseBuffer();

    switch (sceneId) {
      case 1: {
        // Wind + footsteps on dry dirt
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;
        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(280, ctx.currentTime);
        const windGain = ctx.createGain();
        windGain.gain.setValueAtTime(0.07, ctx.currentTime);
        noiseSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(sceneGain);
        noiseSource.start();
        this.activeNodes.push(noiseSource, windGain);

        // Footstep interval (every 650ms)
        this.intervalTimer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const footOsc = this.ctx.createOscillator();
          footOsc.type = 'sine';
          footOsc.frequency.setValueAtTime(75, t);
          footOsc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
          const footGain = this.ctx.createGain();
          footGain.gain.setValueAtTime(0.12, t);
          footGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
          footOsc.connect(footGain);
          footGain.connect(sceneGain);
          footOsc.start(t);
          footOsc.stop(t + 0.13);
        }, 650);
        break;
      }

      case 2: {
        // Rolling thunder and gusting wind
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(220, ctx.currentTime);
        windFilter.Q.setValueAtTime(1.5, ctx.currentTime);
        const windGain = ctx.createGain();
        windGain.gain.setValueAtTime(0.14, ctx.currentTime);
        noise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(sceneGain);
        noise.start();
        this.activeNodes.push(noise);

        // Thunder rumble at t=0.8s
        const thunderOsc = ctx.createOscillator();
        thunderOsc.type = 'sawtooth';
        thunderOsc.frequency.setValueAtTime(50, ctx.currentTime + 0.5);
        thunderOsc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 3.0);
        const thunderFilter = ctx.createBiquadFilter();
        thunderFilter.type = 'lowpass';
        thunderFilter.frequency.setValueAtTime(90, ctx.currentTime);
        const thunderGain = ctx.createGain();
        thunderGain.gain.setValueAtTime(0.001, ctx.currentTime);
        thunderGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 1.2);
        thunderGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
        thunderOsc.connect(thunderFilter);
        thunderFilter.connect(thunderGain);
        thunderGain.connect(sceneGain);
        thunderOsc.start();
        thunderOsc.stop(ctx.currentTime + 3.6);
        this.activeNodes.push(thunderOsc);
        break;
      }

      case 3: {
        // Loud steady rainfall + wooden door latching shut
        const rainSource = ctx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;
        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = 'highpass';
        rainFilter.frequency.setValueAtTime(1000, ctx.currentTime);
        const rainGain = ctx.createGain();
        rainGain.gain.setValueAtTime(0.25, ctx.currentTime);
        rainSource.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(sceneGain);
        rainSource.start();
        this.activeNodes.push(rainSource);

        // Door slam at 2.2s
        const slamTime = ctx.currentTime + 2.0;
        const doorOsc = ctx.createOscillator();
        doorOsc.frequency.setValueAtTime(120, slamTime);
        doorOsc.frequency.exponentialRampToValueAtTime(40, slamTime + 0.35);
        const doorGain = ctx.createGain();
        doorGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        doorGain.gain.setValueAtTime(0.35, slamTime);
        doorGain.gain.exponentialRampToValueAtTime(0.001, slamTime + 0.35);
        doorOsc.connect(doorGain);
        doorGain.connect(sceneGain);
        doorOsc.start(slamTime);
        doorOsc.stop(slamTime + 0.4);
        this.activeNodes.push(doorOsc);
        break;
      }

      case 4: {
        // Muffled torrential rain drumming against mud and wood
        const muffledRain = ctx.createBufferSource();
        muffledRain.buffer = noiseBuffer;
        muffledRain.loop = true;
        const muffledFilter = ctx.createBiquadFilter();
        muffledFilter.type = 'lowpass';
        muffledFilter.frequency.setValueAtTime(320, ctx.currentTime);
        const muffledGain = ctx.createGain();
        muffledGain.gain.setValueAtTime(0.28, ctx.currentTime);
        muffledRain.connect(muffledFilter);
        muffledFilter.connect(muffledGain);
        muffledGain.connect(sceneGain);
        muffledRain.start();
        this.activeNodes.push(muffledRain);
        break;
      }

      case 5: {
        // Dripping water + birds chirping
        const dripInterval = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const drop = this.ctx.createOscillator();
          drop.frequency.setValueAtTime(800 + Math.random() * 400, t);
          drop.frequency.exponentialRampToValueAtTime(400, t + 0.08);
          const dropGain = this.ctx.createGain();
          dropGain.gain.setValueAtTime(0.12, t);
          dropGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          drop.connect(dropGain);
          dropGain.connect(sceneGain);
          drop.start(t);
          drop.stop(t + 0.09);
        }, 700);
        this.intervalTimer = dripInterval;

        // Bird chirp at 1.8s
        setTimeout(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const bird = this.ctx.createOscillator();
          bird.type = 'sine';
          bird.frequency.setValueAtTime(2400, t);
          bird.frequency.linearRampToValueAtTime(3200, t + 0.1);
          bird.frequency.linearRampToValueAtTime(2600, t + 0.2);
          const birdGain = this.ctx.createGain();
          birdGain.gain.setValueAtTime(0.12, t);
          birdGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          bird.connect(birdGain);
          birdGain.connect(sceneGain);
          bird.start(t);
          bird.stop(t + 0.26);
        }, 1800);
        break;
      }

      case 6: {
        // Wet squelches + flapping silver fish in mud
        this.intervalTimer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          // Fish flop slap
          const flop = this.ctx.createOscillator();
          flop.type = 'triangle';
          flop.frequency.setValueAtTime(180, t);
          flop.frequency.exponentialRampToValueAtTime(60, t + 0.06);
          const flopGain = this.ctx.createGain();
          flopGain.gain.setValueAtTime(0.15, t);
          flopGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
          flop.connect(flopGain);
          flopGain.connect(sceneGain);
          flop.start(t);
          flop.stop(t + 0.07);
        }, 450);
        break;
      }

      case 7: {
        // Wide wind rustling leaves & distant splash
        const breeze = ctx.createBufferSource();
        breeze.buffer = noiseBuffer;
        breeze.loop = true;
        const breezeFilter = ctx.createBiquadFilter();
        breezeFilter.type = 'bandpass';
        breezeFilter.frequency.setValueAtTime(450, ctx.currentTime);
        const breezeGain = ctx.createGain();
        breezeGain.gain.setValueAtTime(0.09, ctx.currentTime);
        breeze.connect(breezeFilter);
        breezeFilter.connect(breezeGain);
        breezeGain.connect(sceneGain);
        breeze.start();
        this.activeNodes.push(breeze);
        break;
      }

      case 8: {
        // Delicate puddle water splashes & fish movement
        this.intervalTimer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const splash = this.ctx.createOscillator();
          splash.frequency.setValueAtTime(550, t);
          splash.frequency.exponentialRampToValueAtTime(220, t + 0.07);
          const splashGain = this.ctx.createGain();
          splashGain.gain.setValueAtTime(0.08, t);
          splashGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
          splash.connect(splashGain);
          splashGain.connect(sceneGain);
          splash.start(t);
          splash.stop(t + 0.08);
        }, 500);
        break;
      }

      case 9: {
        // Crisp paper rustle + quiet room tone
        const roomTone = ctx.createOscillator();
        roomTone.type = 'sine';
        roomTone.frequency.setValueAtTime(60, ctx.currentTime);
        const roomGain = ctx.createGain();
        roomGain.gain.setValueAtTime(0.03, ctx.currentTime);
        roomTone.connect(roomGain);
        roomGain.connect(sceneGain);
        roomTone.start();
        this.activeNodes.push(roomTone);

        // Paper turn friction at 1.5s
        setTimeout(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const paper = this.ctx.createBufferSource();
          paper.buffer = noiseBuffer;
          const paperFilter = this.ctx.createBiquadFilter();
          paperFilter.type = 'highpass';
          paperFilter.frequency.setValueAtTime(2500, t);
          const paperGain = this.ctx.createGain();
          paperGain.gain.setValueAtTime(0.18, t);
          paperGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          paper.connect(paperFilter);
          paperFilter.connect(paperGain);
          paperGain.connect(sceneGain);
          paper.start(t);
          paper.stop(t + 0.5);
        }, 1500);
        break;
      }

      case 10: {
        // Roaring waterspout wind & ocean churning
        const sea = ctx.createBufferSource();
        sea.buffer = noiseBuffer;
        sea.loop = true;
        const seaFilter = ctx.createBiquadFilter();
        seaFilter.type = 'bandpass';
        seaFilter.frequency.setValueAtTime(300, ctx.currentTime);
        seaFilter.Q.setValueAtTime(0.8, ctx.currentTime);
        const seaGain = ctx.createGain();
        seaGain.gain.setValueAtTime(0.3, ctx.currentTime);
        sea.connect(seaFilter);
        seaFilter.connect(seaGain);
        seaGain.connect(sceneGain);
        sea.start();
        this.activeNodes.push(sea);
        break;
      }

      case 11: {
        // High-altitude mountain wind
        const mtnWind = ctx.createBufferSource();
        mtnWind.buffer = noiseBuffer;
        mtnWind.loop = true;
        const mtnFilter = ctx.createBiquadFilter();
        mtnFilter.type = 'bandpass';
        mtnFilter.frequency.setValueAtTime(600, ctx.currentTime);
        mtnFilter.Q.setValueAtTime(2.0, ctx.currentTime);
        const mtnGain = ctx.createGain();
        mtnGain.gain.setValueAtTime(0.12, ctx.currentTime);
        mtnWind.connect(mtnFilter);
        mtnFilter.connect(mtnGain);
        mtnGain.connect(sceneGain);
        mtnWind.start();
        this.activeNodes.push(mtnWind);
        break;
      }

      case 12: {
        // Quiet country ambient wind & birds
        const countryBreeze = ctx.createBufferSource();
        countryBreeze.buffer = noiseBuffer;
        countryBreeze.loop = true;
        const cFilter = ctx.createBiquadFilter();
        cFilter.type = 'lowpass';
        cFilter.frequency.setValueAtTime(350, ctx.currentTime);
        const cGain = ctx.createGain();
        cGain.gain.setValueAtTime(0.06, ctx.currentTime);
        countryBreeze.connect(cFilter);
        cFilter.connect(cGain);
        cGain.connect(sceneGain);
        countryBreeze.start();
        this.activeNodes.push(countryBreeze);
        break;
      }

      case 13: {
        // Soft paper rustle & gentle breeze
        const gentleWind = ctx.createBufferSource();
        gentleWind.buffer = noiseBuffer;
        gentleWind.loop = true;
        const gFilter = ctx.createBiquadFilter();
        gFilter.type = 'lowpass';
        gFilter.frequency.setValueAtTime(260, ctx.currentTime);
        const gGain = ctx.createGain();
        gGain.gain.setValueAtTime(0.07, ctx.currentTime);
        gentleWind.connect(gFilter);
        gFilter.connect(gGain);
        gGain.connect(sceneGain);
        gentleWind.start();
        this.activeNodes.push(gentleWind);
        break;
      }

      case 14: {
        // Sloshing water & mud squelching & wicker creak
        this.intervalTimer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const slosh = this.ctx.createOscillator();
          slosh.frequency.setValueAtTime(280, t);
          slosh.frequency.exponentialRampToValueAtTime(110, t + 0.12);
          const sloshGain = this.ctx.createGain();
          sloshGain.gain.setValueAtTime(0.1, t);
          sloshGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
          slosh.connect(sloshGain);
          sloshGain.connect(sceneGain);
          slosh.start(t);
          slosh.stop(t + 0.13);
        }, 900);
        break;
      }

      case 15: {
        // Gentle evening crickets + soft wind
        const crickets = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(4500, t);
          const cGain = this.ctx.createGain();
          cGain.gain.setValueAtTime(0.04, t);
          cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
          osc.connect(cGain);
          cGain.connect(sceneGain);
          osc.start(t);
          osc.stop(t + 0.06);
        }, 320);
        this.intervalTimer = crickets;
        break;
      }

      default:
        break;
    }
  }

  public stop() {
    this.stopCurrentSounds();
    this.currentSceneId = -1;
  }
}

export const diegeticAudio = new DiegeticSoundEngine();
