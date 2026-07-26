'use client';

// =============================================================================
// SOUND LIBRARY MODAL
// =============================================================================
// This modal opens from the Forge tab when user clicks "Browse 40+ Sounds".
// It lets users:
//   1. Search/filter all 50+ sounds
//   2. Preview any sound with WebAudio
//   3. Inject a sound's Suno AI keywords directly into the Forge's style prompt
// =============================================================================

import React, { useState } from 'react';
import { TechnoSound } from '@/db/schema';
import { X, Volume2, Plus, Sparkles, Search, Check } from 'lucide-react';
import { playTechnoSound } from '@/lib/web-audio-techno';

interface SoundLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sounds: TechnoSound[];
  onInjectSound: (keywords: string) => void; // Now receives keywords string
}

const CATEGORIES = [
  'All',
  'Kicks & Low-End',
  'Acid & Synths',
  'Chords & Stabs',
  'Percussion & Hats',
  'Atmosphere & FX',
  'Vocals & Chants',
  'Arrangement & Structure',
];

export default function SoundLibraryModal({
  isOpen,
  onClose,
  sounds,
  onInjectSound,
}: SoundLibraryModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [injectedIds, setInjectedIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  // Filter sounds by category and search query
  const filtered = sounds.filter((s) => {
    if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.sunoPromptDescription.toLowerCase().includes(q) ||
        s.whatItAddsToSong.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle inject with visual feedback
  const handleInject = (sound: TechnoSound) => {
    onInjectSound(sound.sunoPromptDescription);
    setInjectedIds((prev) => new Set(prev).add(sound.id));
    // Brief feedback then close
    setTimeout(() => {
      setInjectedIds((prev) => {
        const next = new Set(prev);
        next.delete(sound.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl my-8">

        {/* ===== Header ===== */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/60">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span>Browse &amp; Inject Techno Sounds into Prompt</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Click &quot;Inject&quot; to add any sound&apos;s AI keywords into your Suno style prompt.
              Then close this modal and copy the updated prompt!
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ===== Search + Category Filter ===== */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-900 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sounds by name, keyword, or description..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Sounds List ===== */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.map((sound) => {
            const wasInjected = injectedIds.has(sound.id);
            return (
              <div
                key={sound.id}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                {/* Sound Info */}
                <div className="space-y-1 sm:w-2/3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase">
                      {sound.category}
                    </span>
                    <h4 className="text-sm font-bold text-white">{sound.name}</h4>
                  </div>
                  <p className="text-xs font-mono text-orange-300">
                    {sound.sunoPromptDescription}
                  </p>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {sound.whatItAddsToSong}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => playTechnoSound(sound.webAudioPreset)}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-orange-400 text-xs font-bold rounded-lg transition-colors"
                    title="Listen to synthesized preview"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => handleInject(sound)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-lg shadow-md transition-all ${
                      wasInjected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white'
                    }`}
                  >
                    {wasInjected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Injected!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Inject into Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No sounds found matching your filter. Try a different search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
