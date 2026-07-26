'use client';

import React, { useState } from 'react';
import { UserPrompt, TechnoSubgenre } from '@/db/schema';
import {
  FolderHeart,
  Copy,
  Check,
  Trash2,
  Heart,
  Sparkles,
  Sliders,
  Music2,
  Bookmark,
} from 'lucide-react';

interface VaultSectionProps {
  prompts: UserPrompt[];
  subgenres: TechnoSubgenre[];
  onToggleFavorite: (id: string, isFavorite: boolean) => Promise<void>;
  onDeletePrompt: (id: string) => Promise<void>;
  onLoadIntoForge: (prompt: UserPrompt) => void;
}

export default function VaultSection({
  prompts,
  subgenres,
  onToggleFavorite,
  onDeletePrompt,
  onLoadIntoForge,
}: VaultSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'style' | 'lyrics' | null>(null);

  const handleCopy = async (id: string, text: string, type: 'style' | 'lyrics') => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Personal AI Techno Archive
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs">{prompts.length} Saved Prompts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              My Suno Techno Vault
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              All of your saved custom style tags and structured song arrangements ready to generate in Suno.AI.
            </p>
          </div>
        </div>
      </div>

      {prompts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
          <FolderHeart className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Your Techno Vault is Empty</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Head over to the Suno Prompt Forge or Audition Sequencer to create and save your custom techno club prompts!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {prompts.map((prm) => {
            const matchedSub = subgenres.find((s) => s.id === prm.subgenreId);
            const isCopiedStyle = copiedId === prm.id && copiedType === 'style';
            const isCopiedLyrics = copiedId === prm.id && copiedType === 'lyrics';

            return (
              <div
                key={prm.id}
                className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 space-y-4 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-orange-400 text-xs font-bold uppercase tracking-wider">
                        {matchedSub ? matchedSub.name : 'Custom Techno'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono">
                        {prm.bpm} BPM
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {prm.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onLoadIntoForge(prm)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors"
                    >
                      Load into Forge
                    </button>

                    <button
                      onClick={() => onToggleFavorite(prm.id, !prm.isFavorite)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        prm.isFavorite
                          ? 'bg-red-500/10 border-red-500/50 text-red-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                      }`}
                      title="Favorite prompt"
                    >
                      <Heart className={`w-4 h-4 ${prm.isFavorite ? 'fill-red-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => onDeletePrompt(prm.id)}
                      className="p-1.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 border border-zinc-700 rounded-lg transition-colors"
                      title="Delete prompt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Style Prompt
                      </span>
                      <button
                        onClick={() => handleCopy(prm.id, prm.stylePrompt, 'style')}
                        className="text-xs text-orange-400 hover:text-orange-300 flex items-center space-x-1"
                      >
                        {isCopiedStyle ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Style</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-xs font-mono text-zinc-200">
                      {prm.stylePrompt}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Lyrics / Arrangement Structure
                      </span>
                      <button
                        onClick={() => handleCopy(prm.id, prm.lyricsArrangement, 'lyrics')}
                        className="text-xs text-orange-400 hover:text-orange-300 flex items-center space-x-1"
                      >
                        {isCopiedLyrics ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Arrangement</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-xs font-mono text-zinc-300 whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {prm.lyricsArrangement || 'No arrangement specified'}
                    </div>
                  </div>
                </div>

                {prm.notes && (
                  <p className="text-xs text-zinc-400 italic border-t border-zinc-800/80 pt-2">
                    Note: {prm.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
