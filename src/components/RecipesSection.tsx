'use client';

import React, { useState } from 'react';
import { TechnoRecipe, TechnoSubgenre } from '@/db/schema';
import {
  BookOpen,
  Copy,
  Check,
  Zap,
  Sparkles,
  Info,
  ChevronRight,
  Sliders,
  Music2,
} from 'lucide-react';

interface RecipesSectionProps {
  recipes: TechnoRecipe[];
  subgenres: TechnoSubgenre[];
  onCloneToForge: (recipe: TechnoRecipe) => void;
}

export default function RecipesSection({
  recipes,
  subgenres,
  onCloneToForge,
}: RecipesSectionProps) {
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
                Curated AI Producer Blueprints
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs">{recipes.length} Master Class Recipes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Master Suno Techno Track Recipes
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              Production-ready Suno.AI track formulas across peak-time, acid, industrial, dub, and melodic techno. Each recipe includes style prompts, structural lyrics tags, and producer commentary on why it works.
            </p>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 gap-8">
        {recipes.map((recipe) => {
          const matchedSub = subgenres.find((s) => s.id === recipe.subgenreId);
          const isCopiedStyle = copiedId === recipe.id && copiedType === 'style';
          const isCopiedLyrics = copiedId === recipe.id && copiedType === 'lyrics';

          return (
            <div
              key={recipe.id}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-xl"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-orange-400 text-xs font-bold uppercase tracking-wider">
                      {matchedSub ? matchedSub.name : 'Techno'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono">
                      {recipe.bpm} BPM
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {recipe.title}
                  </h3>
                </div>

                <button
                  onClick={() => onCloneToForge(recipe)}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all self-start sm:self-center"
                >
                  <Zap className="w-4 h-4" />
                  <span>Clone to Forge</span>
                </button>
              </div>

              {/* Why This Works in Suno.AI */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <Info className="w-4 h-4" />
                  <span>Why This Recipe Works in Suno.AI</span>
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{recipe.explanation}</p>
              </div>

              {/* Grid 2 Columns for Style Prompt vs Lyrics Arrangement */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Style Prompt Box */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Sliders className="w-3.5 h-3.5 text-orange-400" />
                      <span>Suno &quot;Style of Music&quot; Prompt</span>
                    </span>
                    <button
                      onClick={() => handleCopy(recipe.id, recipe.stylePrompt, 'style')}
                      className="text-xs text-zinc-400 hover:text-white flex items-center space-x-1 transition-colors"
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

                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs font-mono text-zinc-200 leading-relaxed">
                      {recipe.stylePrompt}
                    </p>
                  </div>
                </div>

                {/* Right: Structured Arrangement Box */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Music2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Suno &quot;Lyrics / Arrangement&quot; Box</span>
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(recipe.id, recipe.lyricsArrangement, 'lyrics')
                      }
                      className="text-xs text-zinc-400 hover:text-white flex items-center space-x-1 transition-colors"
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

                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 max-h-56 overflow-y-auto">
                    <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                      {recipe.lyricsArrangement}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Author footer */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-3">
                <span>Curated by: {recipe.author}</span>
                <span>Ready for Suno v3.5 & v4</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
