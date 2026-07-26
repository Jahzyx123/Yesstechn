'use client';

// =============================================================================
// MAIN PAGE — Vortex Techno Studio
// =============================================================================
// This is the root page component. It:
//   1. Manages all global state (subgenres, sounds, recipes, prompts)
//   2. Handles API calls to load/save data
//   3. Routes between tabs: Forge, Sounds, Sequencer, Recipes, Vault
//   4. Passes injected sound keywords from the Sound Library Modal into the Forge
// =============================================================================

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SunoPromptForge from '@/components/SunoPromptForge';
import SoundLibrarySection from '@/components/SoundLibrarySection';
import TechnoAuditionSequencer from '@/components/TechnoAuditionSequencer';
import RecipesSection from '@/components/RecipesSection';
import VaultSection from '@/components/VaultSection';
import AddSoundModal from '@/components/AddSoundModal';
import SoundLibraryModal from '@/components/SoundLibraryModal';
import {
  TechnoSubgenre,
  TechnoSound,
  TechnoRecipe,
  UserPrompt,
} from '@/db/schema';
import { INITIAL_SUBGENRES, INITIAL_SOUNDS, INITIAL_RECIPES } from '@/lib/seed-data';
import { Sparkles, Radio, Volume2 } from 'lucide-react';

export default function HomePage() {
  // --- Tab navigation ---
  const [activeTab, setActiveTab] = useState<
    'forge' | 'sounds' | 'sequencer' | 'recipes' | 'vault'
  >('forge');

  // --- Data state ---
  const [subgenres, setSubgenres] = useState<TechnoSubgenre[]>(INITIAL_SUBGENRES);
  const [sounds, setSounds] = useState<TechnoSound[]>(INITIAL_SOUNDS);
  const [recipes, setRecipes] = useState<TechnoRecipe[]>(INITIAL_RECIPES);
  const [prompts, setPrompts] = useState<UserPrompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // --- Modal state ---
  const [isAddSoundOpen, setIsAddSoundOpen] = useState<boolean>(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState<boolean>(false);

  // --- Sound injection: keywords from Library Modal → Forge ---
  const [injectedKeywords, setInjectedKeywords] = useState<string>('');

  // =========================================================================
  // Load all data from API on mount (falls back to static seed data)
  // =========================================================================
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [subRes, sndRes, recRes, prmRes] = await Promise.all([
        fetch('/api/techno-subgenres'),
        fetch('/api/techno-sounds'),
        fetch('/api/techno-recipes'),
        fetch('/api/user-prompts'),
      ]);

      const subData = await subRes.json();
      const sndData = await sndRes.json();
      const recData = await recRes.json();
      const prmData = await prmRes.json();

      if (subData.success && Array.isArray(subData.data) && subData.data.length > 0) {
        setSubgenres(subData.data);
      }
      if (sndData.success && Array.isArray(sndData.data) && sndData.data.length > 0) {
        setSounds(sndData.data);
      }
      if (recData.success && Array.isArray(recData.data) && recData.data.length > 0) {
        setRecipes(recData.data);
      }
      if (prmData.success && Array.isArray(prmData.data)) {
        setPrompts(prmData.data);
      }
    } catch (error) {
      // If API fails, use static seed data (already set as defaults)
      console.warn('API unavailable, using built-in seed data:', error);
      setSubgenres(INITIAL_SUBGENRES);
      setSounds(INITIAL_SOUNDS);
      setRecipes(INITIAL_RECIPES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // =========================================================================
  // Seed Database
  // =========================================================================
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/seed');
      await res.json();
      await fetchAllData();
    } catch (err) {
      console.error('Error seeding DB:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  // =========================================================================
  // Like a sound
  // =========================================================================
  const handleLikeSound = async (id: string) => {
    try {
      const res = await fetch(`/api/techno-sounds/${id}/like`, { method: 'POST' });
      const json = await res.json();
      if (json.success && json.data) {
        setSounds(sounds.map((s) => s.id === id ? { ...s, likesCount: json.data.likesCount } : s));
      } else {
        // Optimistic update fallback
        setSounds(sounds.map((s) => s.id === id ? { ...s, likesCount: s.likesCount + 1 } : s));
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  // =========================================================================
  // Add custom sound
  // =========================================================================
  const handleAddSound = async (soundData: {
    name: string;
    category: string;
    sunoPromptDescription: string;
    whatItAddsToSong: string;
    synthRecipe: string;
    subgenres: string[];
  }) => {
    const res = await fetch('/api/techno-sounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(soundData),
    });
    const json = await res.json();
    if (json.success && json.data) {
      setSounds([json.data, ...sounds]);
    } else {
      throw new Error(json.error || 'Failed to save sound');
    }
  };

  // =========================================================================
  // Save prompt to Vault
  // =========================================================================
  const handleSavePrompt = async (promptData: {
    title: string;
    subgenreId: string;
    stylePrompt: string;
    lyricsArrangement: string;
    bpm: number;
    selectedSoundIds: string[];
    notes: string;
  }) => {
    const res = await fetch('/api/user-prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promptData),
    });
    const json = await res.json();
    if (json.success && json.data) {
      setPrompts([json.data, ...prompts]);
    }
  };

  // =========================================================================
  // Toggle favorite / Delete prompt in Vault
  // =========================================================================
  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await fetch(`/api/user-prompts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite }),
      });
      setPrompts(prompts.map((p) => p.id === id ? { ...p, isFavorite } : p));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      await fetch(`/api/user-prompts/${id}`, { method: 'DELETE' });
      setPrompts(prompts.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  // =========================================================================
  // Cross-tab actions
  // =========================================================================
  const handleCloneRecipe = () => {
    setActiveTab('forge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadVaultPrompt = () => {
    setActiveTab('forge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSequencerToForge = () => {
    setActiveTab('forge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // Handle sound injection from Library Modal → Forge
  // =========================================================================
  const handleInjectSoundKeywords = (keywords: string) => {
    setInjectedKeywords(keywords);
    // Auto-switch to Forge tab so user can see their updated prompt
    setActiveTab('forge');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSeedDatabase={handleSeedDatabase}
        isSeeding={isSeeding}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
            <p className="text-sm font-bold text-zinc-400">
              Loading Vortex Techno Studio &amp; AI Sound Vault...
            </p>
          </div>
        ) : (
          <>
            {/* Tab: Suno Prompt Forge */}
            {activeTab === 'forge' && (
              <SunoPromptForge
                subgenres={subgenres}
                sounds={sounds}
                onSavePrompt={handleSavePrompt}
                onOpenSoundLibrary={() => setIsLibraryModalOpen(true)}
                injectedKeywords={injectedKeywords}
                onConsumedInjection={() => setInjectedKeywords('')}
              />
            )}

            {/* Tab: Sound Library */}
            {activeTab === 'sounds' && (
              <SoundLibrarySection
                sounds={sounds}
                subgenres={subgenres}
                onLikeSound={handleLikeSound}
                onOpenAddModal={() => setIsAddSoundOpen(true)}
              />
            )}

            {/* Tab: Audition Sequencer */}
            {activeTab === 'sequencer' && (
              <TechnoAuditionSequencer onSendToForge={handleSequencerToForge} />
            )}

            {/* Tab: Track Recipes */}
            {activeTab === 'recipes' && (
              <RecipesSection
                recipes={recipes}
                subgenres={subgenres}
                onCloneToForge={handleCloneRecipe}
              />
            )}

            {/* Tab: My Vault */}
            {activeTab === 'vault' && (
              <VaultSection
                prompts={prompts}
                subgenres={subgenres}
                onToggleFavorite={handleToggleFavorite}
                onDeletePrompt={handleDeletePrompt}
                onLoadIntoForge={handleLoadVaultPrompt}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">VORTEX TECHNO STUDIO</p>
                <p className="text-xs text-zinc-400">
                  Built for <a href="https://suno.AI" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Suno.AI</a> v3.5, v4, and Underground Club Producers
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center space-x-1">
                <Radio className="w-3.5 h-3.5 text-orange-400" />
                <span>Web Audio Synthesizer Enabled</span>
              </span>
              <span>•</span>
              <span>12 Techno Subgenres</span>
              <span>•</span>
              <span>50+ AI Sound Elements</span>
              <span>•</span>
              <span>16-Step Audition Beat Lab</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddSoundModal
        isOpen={isAddSoundOpen}
        onClose={() => setIsAddSoundOpen(false)}
        onAddSound={handleAddSound}
      />

      <SoundLibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
        sounds={sounds}
        onInjectSound={handleInjectSoundKeywords}
      />
    </div>
  );
}
