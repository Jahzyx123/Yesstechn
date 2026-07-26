'use client';

import React, { useState } from 'react';
import { TechnoSound, TechnoSubgenre } from '@/db/schema';
import {
  Volume2,
  Copy,
  Check,
  Heart,
  Search,
  Filter,
  Plus,
  Sparkles,
  Info,
  Sliders,
  Cpu,
} from 'lucide-react';
import { playTechnoSound } from '@/lib/web-audio-techno';

interface SoundLibrarySectionProps {
  sounds: TechnoSound[];
  subgenres: TechnoSubgenre[];
  onLikeSound: (id: string) => Promise<void>;
  onOpenAddModal: () => void;
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

export default function SoundLibrarySection({
  sounds,
  subgenres,
  onLikeSound,
  onOpenAddModal,
}: SoundLibrarySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSounds = sounds.filter((s) => {
    if (selectedCategory !== 'All' && s.category !== selectedCategory) {
      return false;
    }
    if (selectedSubgenre !== 'All' && !s.subgenres.includes(selectedSubgenre)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = s.name.toLowerCase().includes(q);
      const promptMatch = s.sunoPromptDescription.toLowerCase().includes(q);
      const addMatch = s.whatItAddsToSong.toLowerCase().includes(q);
      const catMatch = s.category.toLowerCase().includes(q);
      return nameMatch || promptMatch || addMatch || catMatch;
    }
    return true;
  });

  const handleCopyKeywords = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                Sound Roles & Suno AI Timbre Descriptors
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs">
                {sounds.length} Elements Auditionable in WebAudio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Techno Sound Library & Sonic Roles
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              Discover what keywords make these sounds in Suno.AI, hear synthesized live previews, and understand exactly what each element adds to the song in general.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Sound</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Subgenre filter */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sounds by name, Suno AI keyword, TB-303, 909, warehouse, etc..."
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-4 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select
              value={selectedSubgenre}
              onChange={(e) => setSelectedSubgenre(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="All">All Subgenres</option>
              {subgenres.map((sub) => (
                <option key={sub.id} value={sub.slug}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSounds.map((sound) => {
          const isCopied = copiedId === sound.id;
          return (
            <div
              key={sound.id}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-lg"
            >
              {/* Header: Title, Category, Like Button */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                      {sound.category}
                    </span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>{sound.name}</span>
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => playTechnoSound(sound.webAudioPreset)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                      title="Listen to live synthesized techno sound in browser"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Audition</span>
                    </button>

                    <button
                      onClick={() => onLikeSound(sound.id)}
                      className="flex items-center space-x-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-300 transition-colors"
                      title="Upvote sound"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                      <span>{sound.likesCount}</span>
                    </button>
                  </div>
                </div>

                {/* Subgenre tags */}
                <div className="flex flex-wrap gap-1">
                  {sound.subgenres.map((slug) => {
                    const matchedSub = subgenres.find((s) => s.slug === slug);
                    return (
                      <span
                        key={slug}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400"
                      >
                        {matchedSub ? matchedSub.name : slug}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Box 1: What Make this Sound with AI (Suno Prompt Keywords) */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suno.AI Prompt Keywords (&quot;What make this sound with AI&quot;)</span>
                  </span>
                  <button
                    onClick={() => handleCopyKeywords(sound.id, sound.sunoPromptDescription)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-zinc-200 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                  {sound.sunoPromptDescription}
                </p>
              </div>

              {/* Box 2: What it Adds to the Song in General */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>What it Adds to the Song in General</span>
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {sound.whatItAddsToSong}
                </p>
              </div>

              {/* Box 3: Technical Synthesis Recipe */}
              <div className="flex items-center space-x-2 text-[11px] text-zinc-500 border-t border-zinc-800/70 pt-3">
                <Cpu className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">
                  <strong className="text-zinc-400">Synth Recipe: </strong>
                  {sound.synthRecipe}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSounds.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 font-semibold">No sounds found matching your search filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubgenre('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
