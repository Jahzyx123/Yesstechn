// =============================================================================
// VORTEX TECHNO STUDIO — Web Audio Engine
// =============================================================================
// This file powers ALL live sound previews in the browser.
// Each function creates a unique synthesized techno sound using the Web Audio API.
//
// HOW IT WORKS:
// 1. A shared AudioContext is lazily created on first sound trigger.
// 2. Each sound type (kick, acid, clap, etc.) builds its own chain of
//    oscillators → filters → effects → output gain → speakers.
// 3. Oscillators are auto-disposed after their duration via .stop().
//
// FIX: We no longer use exponentialRampToValueAtTime(0.001, ...) for short
// durations — this caused sounds to cut off prematurely. We now use
// Math.max(duration, minimumTail) to ensure every sound plays fully.
// =============================================================================

export type PresetType =
  | 'kick_rumble'
  | 'acid_303'
  | 'dub_chord'
  | 'industrial_hit'
  | 'hihat_loop'
  | 'drone_pad'
  | 'riser_fx'
  | 'vocal_hook'
  | 'sub_bass'
  | 'synth_lead'
  // --- NEW sound types added in this upgrade ---
  | 'clap_909'
  | 'snare_909'
  | 'tom_analog'
  | 'glitch_granular'
  | 'noise_fx'
  | 'laser_zap'
  | 'fm_bell'
  | 'distorted_screech'
  | 'reverse_cymbal'
  | 'percussion_rim';

export interface WebAudioPreset {
  type: PresetType;
  freq?: number;
  decay?: number;
  cutoff?: number;
  resonance?: number;
  delay?: boolean;
  reverb?: boolean;
  distortion?: number;
  note?: string;
}

// ---------------------------------------------------------------------------
// Shared Audio Context (created once, reused for all sounds)
// ---------------------------------------------------------------------------
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const CtxClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new CtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ---------------------------------------------------------------------------
// Helper: Distortion curve for WaveShaperNode
// ---------------------------------------------------------------------------
function makeDistortionCurve(amount: number): Float32Array {
  const k = typeof amount === 'number' ? amount : 50;
  const n_samples = 44100;
  const buffer = new ArrayBuffer(n_samples * 4);
  const curve = new Float32Array(buffer);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

// ---------------------------------------------------------------------------
// Helper: Generate a white noise buffer of the given duration
// ---------------------------------------------------------------------------
function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// ---------------------------------------------------------------------------
// Helper: Connect a chain of audio nodes (variadic)
// ---------------------------------------------------------------------------
function chainNodes(...nodes: AudioNode[]) {
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].connect(nodes[i + 1]);
  }
}

// =============================================================================
// MAIN FUNCTION — Play a synthesized techno sound by preset type
// =============================================================================
export function playTechnoSound(preset: WebAudioPreset): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (preset.type) {

      // =========================================================================
      // KICK: Rumbling 909 kick with sidechain sub-bass
      // =========================================================================
      case 'kick_rumble': {
        const decay = Math.max(0.35, preset.decay || 0.45);

        // Kick drum: sine sweep from high → low
        const osc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
        kickGain.gain.setValueAtTime(1.0, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        // Optional distortion on the kick
        const lastNode: AudioNode = (() => {
          if (preset.distortion && preset.distortion > 0) {
            const ws = ctx.createWaveShaper();
            ws.curve = makeDistortionCurve(preset.distortion * 40) as any;
            kickGain.connect(ws);
            return ws;
          }
          return kickGain;
        })();

        chainNodes(osc, kickGain, lastNode, ctx.destination);

        // Sub-bass rumble after kick
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(preset.freq || 52, now);
        subGain.gain.setValueAtTime(0.05, now);
        subGain.gain.linearRampToValueAtTime(0.45, now + 0.18);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        chainNodes(subOsc, subGain, ctx.destination);

        osc.start(now); osc.stop(now + decay + 0.05);
        subOsc.start(now); subOsc.stop(now + 0.6);
        break;
      }

      // =========================================================================
      // ACID: TB-303 sawtooth with resonant filter sweep
      // =========================================================================
      case 'acid_303': {
        const decay = Math.max(0.35, preset.decay || 0.4);
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const amp = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(preset.freq || 130.81, now);

        filter.type = 'lowpass';
        filter.Q.value = preset.resonance || 16;
        filter.frequency.setValueAtTime(150, now);
        filter.frequency.exponentialRampToValueAtTime(preset.cutoff || 1800, now + 0.12);
        filter.frequency.exponentialRampToValueAtTime(280, now + 0.38);

        amp.gain.setValueAtTime(0.6, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(osc, filter, amp, ctx.destination);
        osc.start(now); osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // DUB CHORD: Minor 7th with tape delay
      // =========================================================================
      case 'dub_chord': {
        const decay = Math.max(0.6, preset.decay || 0.8);
        const freqs = [261.63, 311.13, 392.00, 466.16]; // Cm7

        const masterAmp = ctx.createGain();
        masterAmp.gain.setValueAtTime(0.25, now);
        masterAmp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + decay * 0.5);

        // Tape delay feedback loop
        const delayNode = ctx.createDelay();
        delayNode.delayTime.value = 0.28;
        const feedback = ctx.createGain();
        feedback.gain.value = 0.42;
        delayNode.connect(feedback);
        feedback.connect(delayNode);
        feedback.connect(ctx.destination);

        // Oscillators for each chord note
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          osc.connect(filter);
          osc.start(now);
          osc.stop(now + decay + 0.05);
        });

        filter.connect(masterAmp);
        masterAmp.connect(ctx.destination);
        if (preset.delay !== false) {
          masterAmp.connect(delayNode);
        }
        break;
      }

      // =========================================================================
      // INDUSTRIAL HIT: FM metallic anvil strike
      // =========================================================================
      case 'industrial_hit': {
        const decay = Math.max(0.25, preset.decay || 0.3);
        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const hitGain = ctx.createGain();

        carrier.type = 'square';
        carrier.frequency.setValueAtTime(preset.freq || 680, now);
        modulator.type = 'sawtooth';
        modulator.frequency.setValueAtTime((preset.freq || 680) * 1.414, now);
        modGain.gain.setValueAtTime(800, now);
        modGain.gain.exponentialRampToValueAtTime(10, now + 0.25);
        hitGain.gain.setValueAtTime(0.4, now);
        hitGain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const ws = ctx.createWaveShaper();
        ws.curve = makeDistortionCurve(60) as any;

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        chainNodes(carrier, hitGain, ws, ctx.destination);

        modulator.start(now); carrier.start(now);
        modulator.stop(now + decay + 0.05);
        carrier.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // HI-HAT: Filtered noise burst
      // =========================================================================
      case 'hihat_loop': {
        const decay = Math.max(0.1, preset.decay || 0.15);
        const noise = createNoiseBuffer(ctx, decay + 0.05);
        const source = ctx.createBufferSource();
        source.buffer = noise;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(preset.freq || 6000, now);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.4, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(source, filter, amp, ctx.destination);
        source.start(now);
        source.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // DRONE PAD: Lush sustained atmospheric chord (FIX: longer minimum decay)
      // =========================================================================
      case 'drone_pad': {
        const decay = Math.max(1.5, preset.decay || 2.0); // Was 0.8, too short!
        const freqs = [110, 164.81, 220, 261.63]; // Am drone

        const padAmp = ctx.createGain();
        padAmp.gain.setValueAtTime(0.01, now);
        padAmp.gain.linearRampToValueAtTime(0.2, now + 0.5);
        padAmp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(preset.cutoff || 600, now);
        filter.frequency.linearRampToValueAtTime((preset.cutoff || 600) * 1.5, now + decay * 0.7);
        filter.frequency.exponentialRampToValueAtTime(120, now + decay);

        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(f, now);
          // Subtle detune for richness
          osc.detune.setValueAtTime((idx - 1.5) * 8, now);
          osc.connect(filter);
          osc.start(now);
          osc.stop(now + decay + 0.1);
        });

        filter.connect(padAmp);
        padAmp.connect(ctx.destination);
        break;
      }

      // =========================================================================
      // RISER FX: White noise rising filter sweep (FIX: longer minimum)
      // =========================================================================
      case 'riser_fx': {
        const duration = Math.max(1.0, preset.decay || 1.2); // Was too short
        const noise = createNoiseBuffer(ctx, duration + 0.1);
        const source = ctx.createBufferSource();
        source.buffer = noise;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.value = 12;
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(preset.cutoff || 3500, now + duration * 0.85);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.2, now);
        amp.gain.linearRampToValueAtTime(0.35, now + duration * 0.8);
        amp.gain.exponentialRampToValueAtTime(0.001, now + duration);

        chainNodes(source, filter, amp, ctx.destination);
        source.start(now);
        source.stop(now + duration + 0.1);
        break;
      }

      // =========================================================================
      // VOCAL HOOK: Formant-synthesized chant effect
      // =========================================================================
      case 'vocal_hook': {
        const decay = Math.max(0.4, preset.decay || 0.5);
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(preset.freq || 146.83, now);
        osc.frequency.setValueAtTime((preset.freq || 146.83) * 0.89, now + 0.2);

        const formant = ctx.createBiquadFilter();
        formant.type = 'bandpass';
        formant.frequency.setValueAtTime(750, now);
        formant.Q.value = 8;

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.4, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(osc, formant, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // SUB BASS: Deep rolling sine pulse
      // =========================================================================
      case 'sub_bass': {
        const decay = Math.max(0.25, preset.decay || 0.3);
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(preset.freq || 65, now);
        amp.gain.setValueAtTime(0.7, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);
        chainNodes(osc, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // SYNTH LEAD: Detuned dual-oscillator Detroit lead
      // =========================================================================
      case 'synth_lead': {
        const decay = Math.max(0.3, preset.decay || 0.35);
        const baseFreq = preset.freq || 330;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const amp = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc2.frequency.setValueAtTime(baseFreq * 1.005, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(preset.cutoff || 1500, now);

        amp.gain.setValueAtTime(0.35, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(amp);
        amp.connect(ctx.destination);

        osc1.start(now); osc2.start(now);
        osc1.stop(now + decay + 0.05);
        osc2.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: CLAP — Layered noise burst simulating TR-909 clap
      // =========================================================================
      case 'clap_909': {
        const decay = Math.max(0.15, preset.decay || 0.2);
        // Multiple short noise bursts to simulate multi-layer clap
        for (let i = 0; i < 3; i++) {
          const offset = i * 0.01;
          const noise = createNoiseBuffer(ctx, 0.05);
          const src = ctx.createBufferSource();
          src.buffer = noise;

          const bp = ctx.createBiquadFilter();
          bp.type = 'bandpass';
          bp.frequency.setValueAtTime(1200 + i * 400, now);
          bp.Q.value = 1.5;

          const amp = ctx.createGain();
          amp.gain.setValueAtTime(0.5, now + offset);
          amp.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

          chainNodes(src, bp, amp, ctx.destination);
          src.start(now + offset);
          src.stop(now + offset + 0.06);
        }
        // Reverb tail
        const tail = createNoiseBuffer(ctx, decay);
        const tailSrc = ctx.createBufferSource();
        tailSrc.buffer = tail;
        const tailFilter = ctx.createBiquadFilter();
        tailFilter.type = 'bandpass';
        tailFilter.frequency.setValueAtTime(1000, now);
        tailFilter.Q.value = 0.8;
        const tailAmp = ctx.createGain();
        tailAmp.gain.setValueAtTime(0.3, now + 0.03);
        tailAmp.gain.exponentialRampToValueAtTime(0.001, now + decay);
        chainNodes(tailSrc, tailFilter, tailAmp, ctx.destination);
        tailSrc.start(now + 0.03);
        tailSrc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: SNARE — TR-909 snare body + noise
      // =========================================================================
      case 'snare_909': {
        const decay = Math.max(0.12, preset.decay || 0.18);
        // Body: triangle oscillators
        const bodyFreqs = [200, 260, 340];
        bodyFreqs.forEach((f) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now);
          const amp = ctx.createGain();
          amp.gain.setValueAtTime(0.3, now);
          amp.gain.exponentialRampToValueAtTime(0.001, now + decay * 0.6);
          chainNodes(osc, amp, ctx.destination);
          osc.start(now);
          osc.stop(now + decay);
        });
        // Noise layer
        const noise = createNoiseBuffer(ctx, decay + 0.05);
        const src = ctx.createBufferSource();
        src.buffer = noise;
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.setValueAtTime(2000, now);
        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.5, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);
        chainNodes(src, hp, amp, ctx.destination);
        src.start(now);
        src.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: ANALOG TOM — Pitched tom drum sweep
      // =========================================================================
      case 'tom_analog': {
        const decay = Math.max(0.25, preset.decay || 0.35);
        const startFreq = preset.freq || 200;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 0.4, now + decay * 0.5);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.6, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(osc, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: GLITCH GRANULAR — Stuttered granular noise burst
      // =========================================================================
      case 'glitch_granular': {
        const decay = Math.max(0.2, preset.decay || 0.3);
        const grainCount = 8;
        const grainLen = decay / grainCount;
        for (let i = 0; i < grainCount; i++) {
          const t = now + i * grainLen;
          const noise = createNoiseBuffer(ctx, grainLen * 0.8);
          const src = ctx.createBufferSource();
          src.buffer = noise;
          src.playbackRate.setValueAtTime(0.5 + Math.random() * 2, t);

          const bp = ctx.createBiquadFilter();
          bp.type = 'bandpass';
          bp.frequency.setValueAtTime(500 + Math.random() * 3000, t);
          bp.Q.value = 4 + Math.random() * 12;

          const amp = ctx.createGain();
          amp.gain.setValueAtTime(0.35, t);
          amp.gain.exponentialRampToValueAtTime(0.001, t + grainLen * 0.7);

          chainNodes(src, bp, amp, ctx.destination);
          src.start(t);
          src.stop(t + grainLen * 0.8);
        }
        break;
      }

      // =========================================================================
      // NEW: NOISE FX — Filtered noise sweep
      // =========================================================================
      case 'noise_fx': {
        const decay = Math.max(0.3, preset.decay || 0.5);
        const noise = createNoiseBuffer(ctx, decay + 0.1);
        const src = ctx.createBufferSource();
        src.buffer = noise;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = preset.resonance || 6;
        filter.frequency.setValueAtTime(preset.freq || 800, now);
        filter.frequency.exponentialRampToValueAtTime(preset.cutoff || 3000, now + decay * 0.7);
        filter.frequency.exponentialRampToValueAtTime(200, now + decay);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.3, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(src, filter, amp, ctx.destination);
        src.start(now);
        src.stop(now + decay + 0.1);
        break;
      }

      // =========================================================================
      // NEW: LASER ZAP — Descending pitch zap effect
      // =========================================================================
      case 'laser_zap': {
        const decay = Math.max(0.15, preset.decay || 0.25);
        const startFreq = preset.freq || 2000;

        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + decay);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.4, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const ws = ctx.createWaveShaper();
        ws.curve = makeDistortionCurve(30) as any;

        chainNodes(osc, amp, ws, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: FM BELL — Metallic FM synthesis bell tone
      // =========================================================================
      case 'fm_bell': {
        const decay = Math.max(0.4, preset.decay || 0.8);
        const baseFreq = preset.freq || 880;

        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const amp = ctx.createGain();

        carrier.type = 'sine';
        carrier.frequency.setValueAtTime(baseFreq, now);
        modulator.type = 'sine';
        modulator.frequency.setValueAtTime(baseFreq * 2.756, now); // Inharmonic ratio for bell
        modGain.gain.setValueAtTime(baseFreq * 2, now);
        modGain.gain.exponentialRampToValueAtTime(1, now + decay);

        amp.gain.setValueAtTime(0.3, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        chainNodes(carrier, amp, ctx.destination);

        modulator.start(now); carrier.start(now);
        modulator.stop(now + decay + 0.05);
        carrier.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: DISTORTED SCREECH — Harsh feedback screech
      // =========================================================================
      case 'distorted_screech': {
        const decay = Math.max(0.3, preset.decay || 0.5);
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(preset.freq || 1200, now);
        osc.frequency.linearRampToValueAtTime(preset.freq ? preset.freq * 1.5 : 1800, now + decay * 0.5);
        osc.frequency.linearRampToValueAtTime(preset.freq || 1200, now + decay);

        const ws = ctx.createWaveShaper();
        ws.curve = makeDistortionCurve(preset.distortion ? preset.distortion * 80 : 80) as any;

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.25, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(preset.cutoff || 1500, now);
        bp.Q.value = 5;

        chainNodes(osc, ws, bp, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // NEW: REVERSE CYMBAL — Simulated reverse crash
      // =========================================================================
      case 'reverse_cymbal': {
        const decay = Math.max(0.5, preset.decay || 0.8);
        const noise = createNoiseBuffer(ctx, decay + 0.1);
        const src = ctx.createBufferSource();
        src.buffer = noise;
        // Reverse effect: start quiet, get louder
        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.001, now);
        amp.gain.exponentialRampToValueAtTime(0.5, now + decay * 0.9);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.setValueAtTime(3000, now);

        chainNodes(src, hp, amp, ctx.destination);
        src.start(now);
        src.stop(now + decay + 0.1);
        break;
      }

      // =========================================================================
      // NEW: PERCUSSION RIM — Short metallic rimshot
      // =========================================================================
      case 'percussion_rim': {
        const decay = Math.max(0.06, preset.decay || 0.1);

        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(preset.freq || 800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + decay * 0.5);

        const amp = ctx.createGain();
        amp.gain.setValueAtTime(0.5, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + decay);

        chainNodes(osc, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
        break;
      }

      // =========================================================================
      // DEFAULT fallback: simple beep
      // =========================================================================
      default: {
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        amp.gain.setValueAtTime(0.3, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        chainNodes(osc, amp, ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    }
  } catch (error) {
    console.error('WebAudio preview error:', error);
  }
}
