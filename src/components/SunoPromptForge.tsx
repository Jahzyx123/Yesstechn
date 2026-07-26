'use client';

// =============================================================================
// SUNO PROMPT FORGE
// =============================================================================
// The main creative workspace where users:
//   1. Pick a techno subgenre
//   2. Fine-tune the "Style of Music" prompt for Suno.AI
//   3. Structure their song arrangement with [Intro], [Drop], etc.
//   4. Copy both prompts to paste directly into Suno.AI
//   5. Receive injected keywords from the Sound Library Modal
// =============================================================================

import React, { useState, useEffect } from 'react';
import { TechnoSubgenre, TechnoSound } from '@/db/schema';
import {
  Copy, Check, Plus, Trash2, Sliders, Volume2,
  Bookmark, CheckCircle2, ChevronRight, Music2, Wand2,
} from 'lucide-react';
import { playTechnoSound } from '@/lib/web-audio-techno';

interface SunoPromptForgeProps {
  subgenres: TechnoSubgenre[];
  sounds: TechnoSound[];
  onSavePrompt: (promptData: {
    title: string;
    subgenreId: string;
    stylePrompt: string;
    lyricsArrangement: string;
    bpm: number;
    selectedSoundIds: string[];
    notes: string;
  }) => Promise<void>;
  onOpenSoundLibrary: () => void;
  injectedKeywords: string;         // Keywords injected from Library Modal
  onConsumedInjection: () => void;  // Clear injection after consuming
}

// --- Song section structure ---
interface StructureSection {
  id: string;
  tag: string;        // e.g. "Intro", "Build", "Drop 1"
  description: string; // Sound/instrumentation description
  lyrics?: string;     // Spoken word or vocoder line
}

// --- Default arrangement sections ---
const DEFAULT_SECTIONS: StructureSection[] = [
  { id: 'sec-1', tag: 'Intro', description: 'Dark Warehouse Drone Pad & Hypnotic Off-Beat Hi-Hats', lyrics: '' },
  { id: 'sec-2', tag: 'Verse 1', description: 'Enter Rolling 16th-Note Sub Bassline & Crisp 909 Drums', lyrics: 'We enter the machine. Midnight in Berlin. Close your eyes and feel the frequency.' },
  { id: 'sec-3', tag: 'Build', description: 'TB-303 Resonant Acid Squelch Lead Rising & White Noise Sweep', lyrics: '' },
  { id: 'sec-4', tag: 'Drop 1', description: 'Full 909 Rumble Kick, Rolling Sub Bass & Screaming 303 Acid Lead', lyrics: '' },
  { id: 'sec-5', tag: 'Breakdown', description: 'Cavernous Reverb Wash & Whispered Ritual Chant', lyrics: 'System override. Zero point energy. Never stop the groove.' },
  { id: 'sec-6', tag: 'Drop 2', description: 'Full Relentless Peak-Time Groove & Industrial Metallic Percussion', lyrics: '' },
  { id: 'sec-7', tag: 'Outro', description: 'High-Pass Filtered Drums Fading into Drone Atmosphere', lyrics: '' },
];

export default function SunoPromptForge({
  subgenres,
  sounds,
  onSavePrompt,
  onOpenSoundLibrary,
  injectedKeywords,
  onConsumedInjection,
}: SunoPromptForgeProps) {
  const [selectedSubgenreId, setSelectedSubgenreId] = useState<string>('sub-peaktime');
  const [stylePrompt, setStylePrompt] = useState<string>(
    'peak-time techno, 132 bpm, driving 909 kick, rolling sub bass, dark warehouse atmosphere, relentless groove'
  );
  const [bpm, setBpm] = useState<number>(132);
  const [title, setTitle] = useState<string>('Berlin Warehouse Peak-Time Project');
  const [sections, setSections] = useState<StructureSection[]>(DEFAULT_SECTIONS);
  const [selectedSoundIds, setSelectedSoundIds] = useState<string[]>([
    'snd-909-rumble-kick', 'snd-rolling-sub-bass', 'snd-tb303-acid-squelch', 'snd-warehouse-drone-pad',
  ]);
  const [notes, setNotes] = useState<string>('Designed for Suno v3.5/v4 club anthem.');
  const [copiedStyle, setCopiedStyle] = useState<boolean>(false);
  const [copiedLyrics, setCopiedLyrics] = useState<boolean>(false);
  const [copiedFull, setCopiedFull] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const activeSubgenre = subgenres.find((s) => s.id === selectedSubgenreId) || subgenres[0];

  // =========================================================================
  // Handle injected keywords from Sound Library Modal
  // =========================================================================
  useEffect(() => {
    if (injectedKeywords && injectedKeywords.trim()) {
      // Append injected keywords to current style prompt
      const current = stylePrompt.trim();
      const newKeywords = injectedKeywords.trim();

      // Avoid duplicating keywords that already exist
      const existingParts = current.split(',').map(s => s.trim().toLowerCase());
      const newParts = newKeywords.split(',').map(s => s.trim());
      const uniqueNewParts = newParts.filter(p => !existingParts.includes(p.toLowerCase()));

      if (uniqueNewParts.length > 0) {
        setStylePrompt(`${current}, ${uniqueNewParts.join(', ')}`);
      }

      // Signal that we've consumed the injection
      onConsumedInjection();
    }
  }, [injectedKeywords]);

  // =========================================================================
  // When subgenre changes, update style prompt and BPM
  // =========================================================================
  const handleSelectSubgenre = (sub: TechnoSubgenre) => {
    setSelectedSubgenreId(sub.id);
    setStylePrompt(sub.sunoStyleTags);
    const parsedBpm = parseInt(sub.bpmRange.split(' ')[0]) || 132;
    setBpm(parsedBpm);
  };

  // =========================================================================
  // Quick tag toggle chips
  // =========================================================================
  const COMMON_TAGS = [
    `${bpm} bpm`, '909 kick drum', 'rolling sub bass', 'tb-303 acid lead',
    'dark warehouse atmosphere', 'relentless groove', 'crisp hi-hats',
    'tape delay chord stab', 'industrial metallic percussion', 'robotic vocoder',
    'snare roll build', 'fm synth arpeggio', 'analog warm bass',
  ];

  const toggleTag = (tag: string) => {
    const currentTags = stylePrompt.split(',').map((t) => t.trim());
    if (currentTags.includes(tag)) {
      setStylePrompt(currentTags.filter((t) => t !== tag).join(', '));
    } else {
      setStylePrompt(`${stylePrompt}, ${tag}`);
    }
  };

  // =========================================================================
  // Build the complete Suno Lyrics arrangement string
  // =========================================================================
  const getFullLyricsArrangement = () => {
    return sections
      .map((sec) => {
        let block = `[${sec.tag} - ${sec.description}]`;
        if (sec.lyrics && sec.lyrics.trim()) {
          block += `\n(${sec.lyrics})`;
        }
        return block;
      })
      .join('\n\n');
  };

  // =========================================================================
  // Copy handlers
  // =========================================================================
  const handleCopyStyle = async () => {
    await navigator.clipboard.writeText(stylePrompt);
    setCopiedStyle(true);
    setTimeout(() => setCopiedStyle(false), 2000);
  };

  const handleCopyLyrics = async () => {
    await navigator.clipboard.writeText(getFullLyricsArrangement());
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  // NEW: Copy BOTH style + lyrics as a complete ready-to-paste package
  const handleCopyFull = async () => {
    const full = `=== SUNO STYLE OF MUSIC (paste in Style box) ===\n${stylePrompt}\n\n=== SUNO LYRICS (paste in Lyrics box) ===\n${getFullLyricsArrangement()}`;
    await navigator.clipboard.writeText(full);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 3000);
  };

  // =========================================================================
  // Section management
  // =========================================================================
  const handleAddSection = () => {
    const newId = `sec-${Date.now()}`;
    setSections([
      ...sections,
      { id: newId, tag: 'Drop', description: 'Heavy 909 Rumble Kick & Distorted Synth Lead', lyrics: '' },
    ]);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleUpdateSection = (id: string, field: keyof StructureSection, value: string) => {
    setSections(sections.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  // =========================================================================
  // Save prompt to Vault
  // =========================================================================
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSavePrompt({
        title,
        subgenreId: selectedSubgenreId,
        stylePrompt,
        lyricsArrangement: getFullLyricsArrangement(),
        bpm,
        selectedSoundIds,
        notes,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  // =========================================================================
  // Suno Prompt Quality Score
  // =========================================================================
  const computeScore = () => {
    let score = 50;
    const lower = stylePrompt.toLowerCase();
    if (lower.includes('bpm')) score += 10;
    if (lower.includes('kick') || lower.includes('909') || lower.includes('rumble')) score += 10;
    if (lower.includes('bass') || lower.includes('sub')) score += 10;
    if (lower.includes('303') || lower.includes('synth') || lower.includes('acid') || lower.includes('chord')) score += 10;
    if (lower.includes('warehouse') || lower.includes('dark') || lower.includes('atmosphere')) score += 10;
    return Math.min(100, score);
  };

  const score = computeScore();

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div className="space-y-8 pb-12">

      {/* ===== TOP BANNER ===== */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Suno v3.5 &amp; v4 Prompt Generator
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs">Optimized for Techno Club Anthems</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              The Suno Techno Forge
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Select a subgenre, fine-tune AI sound keywords, and structure your song arrangement with exact Suno meta-tags.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* NEW: One-click copy everything */}
            <button
              onClick={handleCopyFull}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
            >
              {copiedFull ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Copy All for Suno</span>
                </>
              )}
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save to My Vault'}</span>
            </button>
          </div>
        </div>

        {/* ===== Subgenre Selectors ===== */}
        <div className="mt-6">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            1. Select Techno Subgenre ({subgenres.length} Available)
          </label>
          <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
            {subgenres.map((sub) => {
              const isSelected = sub.id === selectedSubgenreId;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubgenre(sub)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-zinc-800 border-red-500 text-white shadow-md shadow-red-500/10'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{sub.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                      {sub.bpmRange}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== MAIN BUILDER GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: Style Prompt Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-orange-400" />
                  <span>Suno Style Prompt Box</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Paste this into Suno&apos;s &quot;Style of Music&quot; input field.
                </p>
              </div>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded ${
                  stylePrompt.length <= 120
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {stylePrompt.length} chars
              </span>
            </div>

            {/* Prompt Textarea */}
            <div className="relative">
              <textarea
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-red-500 rounded-xl p-4 text-sm text-zinc-100 font-mono focus:outline-none transition-colors"
                placeholder="Enter Suno AI style prompt tags..."
              />
              <button
                onClick={handleCopyStyle}
                className="absolute right-3 bottom-3 flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-lg transition-colors border border-zinc-700"
              >
                {copiedStyle ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5 text-zinc-400" /><span>Copy Style</span></>
                )}
              </button>
            </div>

            {/* Quick Tag Chips */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-2">
                Quick Toggle Style Keywords:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_TAGS.map((tag) => {
                  const isIncluded = stylePrompt.toLowerCase().includes(tag.toLowerCase());
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                        isIncluded
                          ? 'bg-red-500/20 border-red-500/50 text-red-300 font-semibold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {isIncluded ? '✓ ' : '+ '}{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt Quality Score */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Suno AI Prompt Synergy Score
                </span>
                <span className="text-sm font-black text-emerald-400">{score}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>BPM Specified</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Hardware/Synth Tags</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Low-End Rumble Described</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Atmospheric Vibe</span>
                </div>
              </div>
            </div>

            {/* Active Sounds Preview + Browse Button */}
            <div className="border-t border-zinc-800 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Active Sounds from Library
                </span>
                <button
                  onClick={onOpenSoundLibrary}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-1"
                >
                  <span>+ Browse 50+ Sounds</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {sounds
                  .filter((s) => selectedSoundIds.includes(s.id))
                  .slice(0, 5)
                  .map((sound) => (
                    <div
                      key={sound.id}
                      className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80"
                    >
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <button
                          onClick={() => playTechnoSound(sound.webAudioPreset)}
                          className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-orange-400 rounded-md transition-colors flex-shrink-0"
                          title="Preview this sound"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-zinc-200 truncate">{sound.name}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{sound.sunoPromptDescription}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Lyrics & Arrangement */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Music2 className="w-5 h-5 text-red-500" />
                  <span>Suno Song Arrangement &amp; Lyrics Box</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Paste this into Suno&apos;s &quot;Lyrics&quot; field. Structure tags guide the AI arrangement.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddSection}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-lg transition-colors border border-zinc-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
                <button
                  onClick={handleCopyLyrics}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs rounded-lg shadow-md transition-all"
                >
                  {copiedLyrics ? (
                    <><Check className="w-3.5 h-3.5 text-white" /><span>Copied Arrangement!</span></>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /><span>Copy for Suno Lyrics</span></>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Section Timeline */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 space-y-3 relative group hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={sec.tag}
                        onChange={(e) => handleUpdateSection(sec.id, 'tag', e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 focus:border-red-500 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg w-36 focus:outline-none"
                        placeholder="Tag (e.g. Drop)"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveSection(sec.id)}
                      className="text-zinc-600 hover:text-red-400 p-1 rounded transition-colors"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                      Sound &amp; Instrumentation Tag:
                    </label>
                    <input
                      type="text"
                      value={sec.description}
                      onChange={(e) => handleUpdateSection(sec.id, 'description', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 text-zinc-200 text-xs px-3 py-2 rounded-lg font-mono focus:outline-none"
                      placeholder="e.g. Full 909 Rumble Kick & 303 Acid Lead"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                      Optional Vocal Hook / Spoken Words:
                    </label>
                    <input
                      type="text"
                      value={sec.lyrics || ''}
                      onChange={(e) => handleUpdateSection(sec.id, 'lyrics', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 text-orange-300 text-xs px-3 py-2 rounded-lg font-mono focus:outline-none"
                      placeholder="Leave blank for pure instrumental section..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Formatted Output Preview */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Formatted Suno Lyrics Box Output Preview
                </span>
                <span className="text-[10px] text-zinc-500">Ready to Paste</span>
              </div>
              <pre className="text-xs text-zinc-300 font-mono bg-zinc-900/60 p-3 rounded-lg overflow-x-auto max-h-40 whitespace-pre-wrap">
                {getFullLyricsArrangement()}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Save Success Toast */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>Prompt Project Saved to My Vault!</span>
        </div>
      )}
    </div>
  );
}
