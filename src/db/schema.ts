import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';

export const technoSubgenres = pgTable('techno_subgenres', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  bpmRange: text('bpm_range').notNull(),
  description: text('description').notNull(),
  sunoStyleTags: text('suno_style_tags').notNull(),
  vibeKeywords: text('vibe_keywords').notNull(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
});

export const technoSounds = pgTable('techno_sounds', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'Kicks & Low-End', 'Acid & Synths', 'Chords & Stabs', 'Percussion & Hats', 'Atmosphere & FX', 'Vocals & Chants', 'Arrangement & Structure'
  sunoPromptDescription: text('suno_prompt_description').notNull(), // Specific keywords for Suno.AI style or lyric/tag prompt
  whatItAddsToSong: text('what_it_adds_to_song').notNull(), // Deep analysis of what this adds to a techno track in general
  synthRecipe: text('synth_recipe').notNull(), // Technical synthesis description
  subgenres: jsonb('subgenres').$type<string[]>().notNull(), // e.g. ['peak-time', 'acid', 'industrial']
  webAudioPreset: jsonb('web_audio_preset').$type<{
    type: 'kick_rumble' | 'acid_303' | 'dub_chord' | 'industrial_hit' | 'hihat_loop' | 'drone_pad' | 'riser_fx' | 'synth_lead' | 'vocal_hook' | 'sub_bass' | 'clap_909' | 'snare_909' | 'tom_analog' | 'glitch_granular' | 'noise_fx' | 'laser_zap' | 'fm_bell' | 'distorted_screech' | 'reverse_cymbal' | 'percussion_rim';
    freq?: number;
    decay?: number;
    cutoff?: number;
    resonance?: number;
    delay?: boolean;
    reverb?: boolean;
    distortion?: number;
    note?: string;
  }>().notNull(),
  likesCount: integer('likes_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const technoRecipes = pgTable('techno_recipes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subgenreId: text('subgenre_id').notNull(),
  bpm: integer('bpm').notNull(),
  stylePrompt: text('style_prompt').notNull(), // Under 120 chars for Suno v3.5/v4
  lyricsArrangement: text('lyrics_arrangement').notNull(), // Full structured arrangement [Intro - ...], [Drop - ...], etc.
  soundIds: jsonb('sound_ids').$type<string[]>().notNull(),
  explanation: text('explanation').notNull(),
  author: text('author').default('Vortex Techno AI').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userPrompts = pgTable('user_prompts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subgenreId: text('subgenre_id').notNull(),
  stylePrompt: text('style_prompt').notNull(),
  lyricsArrangement: text('lyrics_arrangement').notNull(),
  bpm: integer('bpm').notNull(),
  selectedSoundIds: jsonb('selected_sound_ids').$type<string[]>().notNull(),
  notes: text('notes').notNull(),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TechnoSubgenre = typeof technoSubgenres.$inferSelect;
export type TechnoSound = typeof technoSounds.$inferSelect;
export type TechnoRecipe = typeof technoRecipes.$inferSelect;
export type UserPrompt = typeof userPrompts.$inferSelect;
