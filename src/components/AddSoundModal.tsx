'use client';

import React, { useState } from 'react';
import { X, Sparkles, Plus, Info, Sliders, Cpu } from 'lucide-react';

interface AddSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSound: (soundData: {
    name: string;
    category: string;
    sunoPromptDescription: string;
    whatItAddsToSong: string;
    synthRecipe: string;
    subgenres: string[];
  }) => Promise<void>;
}

const CATEGORIES = [
  'Kicks & Low-End',
  'Acid & Synths',
  'Chords & Stabs',
  'Percussion & Hats',
  'Atmosphere & FX',
  'Vocals & Chants',
  'Arrangement & Structure',
];

const SUBGENRES_OPTS = [
  { slug: 'peak-time', name: 'Peak Time / Driving Techno' },
  { slug: 'acid-techno', name: 'Acid Techno' },
  { slug: 'industrial-hard', name: 'Industrial / Hard Techno' },
  { slug: 'dub-techno', name: 'Dub Techno' },
  { slug: 'hypnotic-minimal', name: 'Hypnotic / Minimal Techno' },
  { slug: 'melodic-techno', name: 'Melodic Techno (Afterlife)' },
  { slug: 'detroit-techno', name: 'Detroit Techno' },
  { slug: 'ebm-dark-synth', name: 'EBM / Dark Synth Techno' },
  { slug: 'schranz', name: 'Schranz Hard Techno' },
  { slug: '90s-rave', name: '90s Rave / Old School' },
];

export default function AddSoundModal({
  isOpen,
  onClose,
  onAddSound,
}: AddSoundModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [sunoPromptDescription, setSunoPromptDescription] = useState('');
  const [whatItAddsToSong, setWhatItAddsToSong] = useState('');
  const [synthRecipe, setSynthRecipe] = useState('');
  const [selectedSubgenres, setSelectedSubgenres] = useState<string[]>(['peak-time']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleSubgenre = (slug: string) => {
    if (selectedSubgenres.includes(slug)) {
      if (selectedSubgenres.length > 1) {
        setSelectedSubgenres(selectedSubgenres.filter((s) => s !== slug));
      }
    } else {
      setSelectedSubgenres([...selectedSubgenres, slug]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !sunoPromptDescription.trim() || !whatItAddsToSong.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddSound({
        name: name.trim(),
        category,
        sunoPromptDescription: sunoPromptDescription.trim(),
        whatItAddsToSong: whatItAddsToSong.trim(),
        synthRecipe: synthRecipe.trim() || 'Synthesized hardware sound',
        subgenres: selectedSubgenres,
      });
      // reset and close
      setName('');
      setSunoPromptDescription('');
      setWhatItAddsToSong('');
      setSynthRecipe('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add sound');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Techno Sound Descriptor</h2>
              <p className="text-xs text-zinc-400">
                Share a new AI timbre descriptor and analysis with the community
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Sound Element Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acid Filter Squelch Lead or 909 Boxy Kick"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-orange-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Suno.AI Prompt Keywords (&quot;What make this sound with AI&quot;) *</span>
            </label>
            <input
              type="text"
              required
              value={sunoPromptDescription}
              onChange={(e) => setSunoPromptDescription(e.target.value)}
              placeholder="e.g. heavy 909 rumbling kick drum, deep rolling sidechain sub-bass rumble"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Keywords to include in Suno style tag or square bracket arrangement tags.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Info className="w-3.5 h-3.5" />
              <span>What it Adds to the Song in General *</span>
            </label>
            <textarea
              required
              rows={3}
              value={whatItAddsToSong}
              onChange={(e) => setWhatItAddsToSong(e.target.value)}
              placeholder="Explain how this sound functions in a techno track (e.g. 'Creates the foundational hypnotic groove and warehouse physical pressure...')"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Synthesis / Hardware Recipe</span>
            </label>
            <input
              type="text"
              value={synthRecipe}
              onChange={(e) => setSynthRecipe(e.target.value)}
              placeholder="e.g. TR-909 kick drum distorted through overdrive and sidechained"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Compatible Techno Subgenres
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUBGENRES_OPTS.map((sub) => {
                const isSelected = selectedSubgenres.includes(sub.slug);
                return (
                  <button
                    type="button"
                    key={sub.slug}
                    onClick={() => toggleSubgenre(sub.slug)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-semibold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-red-600/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Sound Descriptor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
