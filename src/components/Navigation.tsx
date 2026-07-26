'use client';

import React from 'react';
import {
  Zap,
  Radio,
  BookOpen,
  FolderHeart,
  Volume2,
  Sparkles,
  Database,
  Music,
} from 'lucide-react';

interface NavigationProps {
  activeTab: 'forge' | 'sounds' | 'sequencer' | 'recipes' | 'vault';
  setActiveTab: (tab: 'forge' | 'sounds' | 'sequencer' | 'recipes' | 'vault') => void;
  onSeedDatabase: () => void;
  isSeeding: boolean;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  onSeedDatabase,
  isSeeding,
}: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('forge')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-wider bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  VORTEX TECHNO STUDIO
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/30 rounded-full">
                  Suno.AI Forge
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Master Prompt Engine & Interactive Techno Sound Library
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('forge')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'forge'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Suno Prompt Forge</span>
            </button>

            <button
              onClick={() => setActiveTab('sounds')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'sounds'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Volume2 className="w-4 h-4" />
                  <span>Sound Library & Roles</span>
            </button>

            <button
              onClick={() => setActiveTab('sequencer')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'sequencer'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Audition Sequencer</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'recipes'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Track Recipes</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <FolderHeart className="w-4 h-4" />
              <span>My Vault</span>
            </button>
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              title="Verify or Reset Database Seed"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-300 transition-colors"
            >
              <Database className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin text-red-500' : 'text-orange-400'}`} />
              <span className="hidden sm:inline">{isSeeding ? 'Seeding...' : 'Seed DB'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/80 text-xs">
          <button
            onClick={() => setActiveTab('forge')}
            className={`flex flex-col items-center py-1 ${activeTab === 'forge' ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>Forge</span>
          </button>
          <button
            onClick={() => setActiveTab('sounds')}
            className={`flex flex-col items-center py-1 ${activeTab === 'sounds' ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <Volume2 className="w-4 h-4 mb-0.5" />
            <span>Sounds</span>
          </button>
          <button
            onClick={() => setActiveTab('sequencer')}
            className={`flex flex-col items-center py-1 ${activeTab === 'sequencer' ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <Radio className="w-4 h-4 mb-0.5" />
            <span>Sequencer</span>
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex flex-col items-center py-1 ${activeTab === 'recipes' ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Recipes</span>
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex flex-col items-center py-1 ${activeTab === 'vault' ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <FolderHeart className="w-4 h-4 mb-0.5" />
            <span>Vault</span>
          </button>
        </div>
      </div>
    </header>
  );
}
