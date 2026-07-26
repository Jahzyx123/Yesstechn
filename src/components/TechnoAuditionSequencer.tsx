'use client';

// =============================================================================
// TECHNO AUDITION SEQUENCER
// =============================================================================
// A live 16-step drum machine where users can:
//   1. Toggle individual beats on/off for each track
//   2. Play/stop the sequencer to hear layered techno sounds
//   3. Adjust BPM and load style presets
//   4. Export combined keywords to the Suno Prompt Forge
//
// FIX: The sequencer now properly triggers WebAudio sounds on each step
// without overlapping issues. The step effect depends on [currentStep, isPlaying]
// and uses a cleanup guard to prevent duplicate triggers.
// =============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Sparkles, Sliders, Send } from 'lucide-react';
import { playTechnoSound, WebAudioPreset } from '@/lib/web-audio-techno';

interface TechnoAuditionSequencerProps {
  onSendToForge: (combinedPrompt: string, selectedSoundNames: string[]) => void;
}

interface SequencerTrack {
  id: string;
  name: string;
  category: string;
  sunoKeywords: string;
  preset: WebAudioPreset;
  steps: boolean[]; // 16 steps
  enabled: boolean;
}

// =========================================================================
// Default tracks — 8 tracks using different sound engines
// =========================================================================
const INITIAL_TRACKS: SequencerTrack[] = [
  {
    id: 'trk-kick',
    name: '909 Rumbling Kick Drum',
    category: 'Kicks & Low-End',
    sunoKeywords: 'heavy 909 rumbling kick drum, deep rolling sidechain sub-bass rumble',
    preset: { type: 'kick_rumble', freq: 52, decay: 0.42 },
    steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    enabled: true,
  },
  {
    id: 'trk-hihat',
    name: '909 Off-Beat Hi-Hat',
    category: 'Percussion & Hats',
    sunoKeywords: 'crisp 909 off-beat open hi-hat, relentless techno hi-hat groove',
    preset: { type: 'hihat_loop', freq: 6500, decay: 0.12 },
    steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
    enabled: true,
  },
  {
    id: 'trk-clap',
    name: '909 Snappy Clap',
    category: 'Percussion & Hats',
    sunoKeywords: 'crisp snappy 909 clap, classic drum machine clap hit',
    preset: { type: 'clap_909', decay: 0.2 },
    steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    enabled: true,
  },
  {
    id: 'trk-acid',
    name: 'TB-303 Acid Squelch Lead',
    category: 'Acid & Synths',
    sunoKeywords: 'tb-303 resonant acid squelch synth lead, twisting acid filter sweep',
    preset: { type: 'acid_303', cutoff: 800, resonance: 16, note: 'C3' },
    steps: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false],
    enabled: true,
  },
  {
    id: 'trk-dub',
    name: 'Dub Techno Chord Stab',
    category: 'Chords & Stabs',
    sunoKeywords: 'dub techno minor chord stab with tape delay and reverb',
    preset: { type: 'dub_chord', freq: 261.63, decay: 0.7, delay: true, reverb: true },
    steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    enabled: true,
  },
  {
    id: 'trk-anvil',
    name: 'Industrial Metallic Hit',
    category: 'Percussion & Hats',
    sunoKeywords: 'metallic anvil industrial percussion, iron clank warehouse hit',
    preset: { type: 'industrial_hit', freq: 720, decay: 0.25, distortion: 0.5 },
    steps: [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true],
    enabled: false,
  },
  {
    id: 'trk-sub',
    name: 'Rolling Sub Bassline',
    category: 'Kicks & Low-End',
    sunoKeywords: 'rolling 16th-note sub bassline, tight synthesized low-end groove',
    preset: { type: 'sub_bass', freq: 65, decay: 0.25 },
    steps: [false, true, true, true, false, true, true, true, false, true, true, true, false, true, true, true],
    enabled: false,
  },
  {
    id: 'trk-fm-arp',
    name: 'FM Bell Arpeggio',
    category: 'Acid & Synths',
    sunoKeywords: 'fm metallic bell arpeggio, polyrhythmic fm synth sequence',
    preset: { type: 'fm_bell', freq: 660, decay: 0.4 },
    steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    enabled: false,
  },
];

export default function TechnoAuditionSequencer({ onSendToForge }: TechnoAuditionSequencerProps) {
  const [tracks, setTracks] = useState<SequencerTrack[]>(INITIAL_TRACKS);
  const [bpm, setBpm] = useState<number>(134);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [presetName, setPresetName] = useState<string>('Berlin Peak Time Combo');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevStepRef = useRef<number>(-1);

  // =========================================================================
  // Sequencer loop — advances step on each beat interval
  // =========================================================================
  useEffect(() => {
    if (isPlaying) {
      const stepDurationMs = (60 / bpm / 4) * 1000; // 16th note duration
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 16);
      }, stepDurationMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setCurrentStep(0);
      prevStepRef.current = -1;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, bpm]);

  // =========================================================================
  // Trigger sounds when step changes while playing
  // FIX: Only trigger if step actually changed (prevents duplicate triggers)
  // =========================================================================
  useEffect(() => {
    if (!isPlaying) return;
    if (prevStepRef.current === currentStep) return; // Guard against duplicate
    prevStepRef.current = currentStep;

    tracks.forEach((track) => {
      if (track.enabled && track.steps[currentStep]) {
        playTechnoSound(track.preset);
      }
    });
  }, [currentStep, isPlaying, tracks]);

  // =========================================================================
  // Toggle individual step in a track
  // =========================================================================
  const toggleStep = (trackId: string, stepIdx: number) => {
    setTracks(
      tracks.map((trk) => {
        if (trk.id === trackId) {
          const newSteps = [...trk.steps];
          newSteps[stepIdx] = !newSteps[stepIdx];
          return { ...trk, steps: newSteps };
        }
        return trk;
      })
    );
  };

  // Toggle track on/off
  const toggleTrackEnabled = (trackId: string) => {
    setTracks(
      tracks.map((trk) =>
        trk.id === trackId ? { ...trk, enabled: !trk.enabled } : trk
      )
    );
  };

  // =========================================================================
  // Style presets — quick-load track combinations
  // =========================================================================
  const loadPreset = (type: 'peaktime' | 'acid' | 'industrial' | 'dub') => {
    const presets: Record<string, { bpm: number; name: string; tracks: string[] }> = {
      peaktime: { bpm: 134, name: 'Peak-Time Warehouse Groove', tracks: ['trk-kick', 'trk-hihat', 'trk-clap', 'trk-acid', 'trk-dub'] },
      acid: { bpm: 140, name: 'TB-303 High-Speed Acid', tracks: ['trk-kick', 'trk-hihat', 'trk-clap', 'trk-acid', 'trk-sub'] },
      industrial: { bpm: 145, name: 'Industrial Anvil Schranz', tracks: ['trk-kick', 'trk-hihat', 'trk-clap', 'trk-anvil', 'trk-sub'] },
      dub: { bpm: 122, name: 'Basic Channel Oceanic Dub', tracks: ['trk-kick', 'trk-dub', 'trk-hihat', 'trk-fm-arp'] },
    };

    const preset = presets[type];
    if (preset) {
      setBpm(preset.bpm);
      setPresetName(preset.name);
      setTracks(
        tracks.map((trk) => ({
          ...trk,
          enabled: preset.tracks.includes(trk.id),
        }))
      );
    }
  };

  // =========================================================================
  // Combine enabled track keywords for Suno
  // =========================================================================
  const getCombinedKeywords = () => {
    const enabledTracks = tracks.filter((trk) => trk.enabled);
    const keywords = enabledTracks.map((trk) => trk.sunoKeywords);
    return `${bpm} bpm, ${keywords.join(', ')}`;
  };

  const handleSendToForge = () => {
    const enabledTracks = tracks.filter((trk) => trk.enabled);
    const names = enabledTracks.map((trk) => trk.name);
    onSendToForge(getCombinedKeywords(), names);
  };

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div className="space-y-8 pb-12">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Live Interactive Special Feature
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs">Web Audio 16-Step Synthesizer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Techno Beat Audition Sequencer
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              Layer 909 Kicks, 303 Acid, Dub Chords, FM Bells, Claps and more in real-time, then send the combination to the Suno Prompt Forge!
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/25'
              }`}
            >
              {isPlaying ? (
                <><Square className="w-4 h-4 fill-white" /><span>STOP BEAT</span></>
              ) : (
                <><Play className="w-4 h-4 fill-white" /><span>PLAY AUDITION LOOP</span></>
              )}
            </button>

            <button
              onClick={handleSendToForge}
              className="flex items-center space-x-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-orange-400 hover:text-orange-300 font-bold text-sm rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send to Suno Forge</span>
            </button>
          </div>
        </div>

        {/* BPM & Presets */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tempo:</span>
              <span className="text-sm font-black text-white font-mono">{bpm} BPM</span>
            </div>
            <input
              type="range"
              min={120}
              max={155}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-32 sm:w-48 accent-orange-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Preset:</span>
            {[
              { key: 'peaktime' as const, label: 'Peak-Time' },
              { key: 'acid' as const, label: 'Acid 140' },
              { key: 'industrial' as const, label: 'Industrial' },
              { key: 'dub' as const, label: 'Dub Techno' },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => loadPreset(p.key)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-lg border border-zinc-700"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 16-STEP SEQUENCER GRID ===== */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4 overflow-x-auto">
        {/* Step position indicator */}
        <div className="flex items-center justify-between mb-2 min-w-[700px]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            16-Step Rhythmic Grid (4/4 Bar)
          </span>
          <div className="flex items-center space-x-1.5">
            {[...Array(16)].map((_, idx) => (
              <div
                key={idx}
                className={`w-7 h-2 rounded-sm transition-all ${
                  isPlaying && currentStep === idx
                    ? 'bg-red-500 shadow-md shadow-red-500/50 scale-110'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-3 min-w-[700px]">
          {tracks.map((track) => (
            <div
              key={track.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                track.enabled
                  ? 'bg-zinc-950/90 border-zinc-700'
                  : 'bg-zinc-950/40 border-zinc-900 opacity-60'
              }`}
            >
              {/* Track toggle + name */}
              <div className="flex items-center space-x-3 w-64 pr-4">
                <button
                  onClick={() => toggleTrackEnabled(track.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] border transition-colors ${
                    track.enabled
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                  }`}
                >
                  {track.enabled ? '✓' : ''}
                </button>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">{track.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{track.category}</p>
                </div>
              </div>

              {/* 16 Step Buttons */}
              <div className="flex items-center space-x-1.5">
                {track.steps.map((isActive, idx) => {
                  const isCurrent = isPlaying && currentStep === idx;
                  const isBeatDown = idx % 4 === 0;
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleStep(track.id, idx)}
                      className={`w-8 h-8 rounded-lg font-mono text-[10px] transition-all flex items-center justify-center ${
                        isActive
                          ? isCurrent
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 scale-105'
                            : 'bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold'
                          : isCurrent
                          ? 'bg-zinc-700 text-zinc-400'
                          : isBeatDown
                          ? 'bg-zinc-800/80 border border-zinc-700 text-zinc-600 hover:bg-zinc-750'
                          : 'bg-zinc-900 border border-zinc-800/60 text-zinc-700 hover:bg-zinc-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Preview one-shot */}
              <button
                onClick={() => playTechnoSound(track.preset)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-orange-400 rounded-lg ml-3 transition-colors"
                title="Preview this sound"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== COMBINED PROMPT OUTPUT ===== */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Generated Suno.AI Prompt from Audition Sequencer</span>
            </h3>
            <p className="text-xs text-zinc-400">
              This prompt combines the exact timbres of the tracks currently enabled in your live beat.
            </p>
          </div>

          <button
            onClick={handleSendToForge}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Suno Forge</span>
          </button>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs font-mono text-zinc-200">{getCombinedKeywords()}</p>
        </div>
      </div>
    </div>
  );
}
