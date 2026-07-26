import { TechnoSubgenre, TechnoSound, TechnoRecipe } from '@/db/schema';

// =============================================================================
// SUBGENRES — 12 core techno styles
// =============================================================================
export const INITIAL_SUBGENRES: TechnoSubgenre[] = [
  {
    id: 'sub-peaktime',
    name: 'Peak Time / Driving Techno',
    slug: 'peak-time',
    bpmRange: '128 - 134 BPM',
    description: 'High-energy mainstage club techno featuring relentless 909 kicks, rumbling sidechained sub-bass, and driving hi-hat grooves designed for peak warehouse floor hours.',
    sunoStyleTags: 'peak-time techno, driving 909 kick, rolling sub bass, dark warehouse atmosphere, 132 bpm, relentless groove, crisp hi-hats',
    vibeKeywords: 'Driving, Warehouse, Peak Floor, Relentless, Energetic, Club',
    color: 'from-orange-500 to-red-600',
    icon: 'Zap',
  },
  {
    id: 'sub-acid',
    name: 'Acid Techno',
    slug: 'acid-techno',
    bpmRange: '135 - 142 BPM',
    description: 'Hypnotic, squelching Roland TB-303 synthesizer basslines with aggressive filter resonance manipulation, acid sweeps, and fast-paced punchy 909 percussion.',
    sunoStyleTags: 'acid techno, 138 bpm, tb-303 resonant acid squelch, filter sweep lead, punchy 909 kick drum, psychedelic acid riff, high energy',
    vibeKeywords: 'Squelchy, Psychedelic, TB-303, Resonant, Hypnotic, High-Tempo',
    color: 'from-lime-400 to-emerald-600',
    icon: 'Radio',
  },
  {
    id: 'sub-industrial',
    name: 'Industrial / Hard Techno',
    slug: 'industrial-hard',
    bpmRange: '140 - 150 BPM',
    description: 'Aggressive, raw, and metallic techno featuring heavy distorted kicks, anvil percussion, warehouse reverb clatters, and dark dystopian soundscapes.',
    sunoStyleTags: 'hard industrial techno, 145 bpm, distorted rumble kick, metallic anvil percussion, dark cyberpunk dystopia, harsh textures, aggressive',
    vibeKeywords: 'Aggressive, Metallic, Distorted, Dark, Warehouse, Dystopian',
    color: 'from-zinc-500 to-red-700',
    icon: 'Hammer',
  },
  {
    id: 'sub-dub',
    name: 'Dub Techno',
    slug: 'dub-techno',
    bpmRange: '120 - 126 BPM',
    description: 'Deep, spatial, and meditative techno pioneered by Basic Channel, featuring minor chords drenched in tape delay, spring reverb, sub-bass, and hiss.',
    sunoStyleTags: 'dub techno, 122 bpm, deep minor chord stabs, tape delay reverb wash, sub bass, vinyl hiss, atmospheric hypnotic groove',
    vibeKeywords: 'Deep, Meditative, Echoing, Tape Delay, Spatial, Minimal',
    color: 'from-cyan-600 to-blue-800',
    icon: 'Waves',
  },
  {
    id: 'sub-hypnotic',
    name: 'Hypnotic / Minimal Techno',
    slug: 'hypnotic-minimal',
    bpmRange: '128 - 136 BPM',
    description: 'Trippy, repetitive polyrhythmic loops that evolve subtly over time. Designed to induce a trance-like mental state on late-night dancefloors.',
    sunoStyleTags: 'hypnotic minimal techno, 132 bpm, polyrhythmic fm arpeggio, subtle evolving loops, deep sub bass, tribal percussion, mind trance',
    vibeKeywords: 'Hypnotic, Trippy, Polyrhythmic, Evolving, Mind-Altering',
    color: 'from-purple-600 to-indigo-900',
    icon: 'Compass',
  },
  {
    id: 'sub-melodic',
    name: 'Melodic Techno (Afterlife Style)',
    slug: 'melodic-techno',
    bpmRange: '122 - 128 BPM',
    description: 'Emotional, cinematic techno featuring sweeping analog synthesizer leads, lush arpeggios, choral drone pads, and rolling basslines.',
    sunoStyleTags: 'melodic techno, 124 bpm, cinematic analog synth arpeggio, emotional minor chords, rolling bassline, lush atmosphere, afterlife style',
    vibeKeywords: 'Emotional, Cinematic, Epic, Arpeggiated, Melodic, Lush',
    color: 'from-amber-400 to-pink-600',
    icon: 'Sparkles',
  },
  {
    id: 'sub-detroit',
    name: 'Detroit Techno',
    slug: 'detroit-techno',
    bpmRange: '125 - 132 BPM',
    description: 'The roots of techno from Detroit (Juan Atkins, Derrick May, Kevin Saunderson). Soulful futurism, syncopated 808/909 drum machines, and warm strings.',
    sunoStyleTags: 'detroit techno, 128 bpm, classic 909 drum machine, soulful synth strings, futuristic chord stab, syncopated groove, warm analog',
    vibeKeywords: 'Soulful, Futuristic, Analog, Classic, Syncopated, Detroit',
    color: 'from-yellow-500 to-amber-700',
    icon: 'Disc',
  },
  {
    id: 'sub-ebm',
    name: 'EBM / Dark Synth Techno',
    slug: 'ebm-dark-synth',
    bpmRange: '125 - 135 BPM',
    description: 'Electronic Body Music fusion featuring aggressive sequenced basslines, cyberpunk dark-wave synths, robotic vocal hooks, and marching industrial rhythms.',
    sunoStyleTags: 'ebm dark techno, 130 bpm, sequenced rolling synth bassline, cyberpunk atmosphere, robotic vocoder, dark synthwave fusion, driving',
    vibeKeywords: 'Cyberpunk, Sequenced, Dark-Wave, Robotic, Marching',
    color: 'from-fuchsia-600 to-slate-900',
    icon: 'Cpu',
  },
  {
    id: 'sub-schranz',
    name: 'Schranz / Fast Hard Techno',
    slug: 'schranz',
    bpmRange: '150 - 160 BPM',
    description: 'Ultra-fast, loop-based German hard techno characterized by relentless distorted 909 kicks, compressed percussion loops, and high-octane drive.',
    sunoStyleTags: 'schranz hard techno, 155 bpm, fast relentless distorted kick, aggressive percussion loop, high energy warehouse rave, intense speed',
    vibeKeywords: 'Ultra-Fast, Relentless, Schranz, High-Octane, Loop-Driven',
    color: 'from-red-600 to-stone-900',
    icon: 'Flame',
  },
  {
    id: 'sub-rave90s',
    name: '90s Rave / Old School Techno',
    slug: '90s-rave',
    bpmRange: '135 - 145 BPM',
    description: 'Nostalgic 90s warehouse rave techno featuring hoover synth leads, breakbeat chops, euphoric piano stabs, and classic siren samples.',
    sunoStyleTags: '90s rave techno, 140 bpm, hoover synth lead, euphoric rave chord stab, breakbeat roll, warehouse party, energetic retro',
    vibeKeywords: 'Nostalgic, Hoover Lead, Breakbeat, Euphoric, 90s Rave',
    color: 'from-pink-500 to-purple-600',
    icon: 'PartyPopper',
  },
  {
    id: 'sub-psytechno',
    name: 'Psy-Techno / Trippy Dark',
    slug: 'psy-techno',
    bpmRange: '136 - 142 BPM',
    description: 'A psychedelic hybrid of techno and psytrance featuring tight galloping basslines, laser FM sweeps, glitchy percussion, and mind-bending FX.',
    sunoStyleTags: 'psy-techno, 138 bpm, psychedelic fm synth sweep, galloping sub bassline, trippy glitch percussion, dark hypnotic atmosphere',
    vibeKeywords: 'Psychedelic, Galloping, Glitchy, Laser FX, Mind-Bending',
    color: 'from-teal-400 to-emerald-700',
    icon: 'Eye',
  },
  {
    id: 'sub-raw',
    name: 'Raw / Hypnotic Warehouse Techno',
    slug: 'raw-warehouse',
    bpmRange: '134 - 140 BPM',
    description: 'Unpolished, analog-heavy techno focusing on raw groove, saturation, minimal synth elements, and physical acoustic warehouse reverb.',
    sunoStyleTags: 'raw warehouse techno, 136 bpm, analog saturated 909 kick, hypnotic minimal percussion, dark warehouse acoustics, unpolished groove',
    vibeKeywords: 'Raw, Unpolished, Analog, Warehouse, Saturated',
    color: 'from-stone-600 to-neutral-900',
    icon: 'Building2',
  },
];

// =============================================================================
// SOUNDS — 50+ curated techno sound elements
// =============================================================================
export const INITIAL_SOUNDS: TechnoSound[] = [

  // =========================================================================
  // CATEGORY 1: KICKS & LOW-END (7 sounds)
  // =========================================================================
  {
    id: 'snd-909-rumble-kick',
    name: '909 Rumbling Kick Drum & Sidechain Sub',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'heavy 909 rumbling kick drum, deep rolling sidechain sub-bass rumble, punchy techno low-end, warehouse kick resonance',
    whatItAddsToSong: 'Creates the hypnotic groove backbone and low-end physical pressure. The sidechain rumble fills the empty space between kicks, creating a continuous driving momentum that locks the listener into a trance state. Essential for peak-time, industrial, and raw techno.',
    synthRecipe: 'TR-909 kick drum with a decayed reverb tail distorted through overdrive, low-pass filtered at 120Hz, and sidechained to dip when the dry kick hits.',
    subgenres: ['peak-time', 'industrial-hard', 'raw-warehouse', 'schranz'],
    webAudioPreset: { type: 'kick_rumble', freq: 52, decay: 0.45, distortion: 0.35 },
    likesCount: 142,
    createdAt: new Date(),
  },
  {
    id: 'snd-rolling-sub-bass',
    name: 'Rolling 16th-Note Sub Bassline',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'rolling 16th-note sub bassline, tight synthesized low-end groove, rhythmic sub pulse, warm analog low frequencies',
    whatItAddsToSong: 'Provides kinetic energy and forward motion beneath the drums. It turns a static drum beat into an irresistible head-nodding groove, giving the song a rhythmic bounce that drives dancefloor engagement.',
    synthRecipe: 'Sawtooth wave synth bass with 24dB ladder low-pass filter set around 180Hz, tight decay envelope, sequenced in 16th-note galloping syncopation.',
    subgenres: ['peak-time', 'melodic-techno', 'psy-techno', 'ebm-dark-synth'],
    webAudioPreset: { type: 'sub_bass', freq: 65, decay: 0.3, cutoff: 220 },
    likesCount: 98,
    createdAt: new Date(),
  },
  {
    id: 'snd-industrial-distorted-kick',
    name: 'Industrial Overdrive Distorted Kick',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'aggressive distorted industrial kick drum, clipped overdrive kick, harsh metallic low-end punch, gabber-influenced techno kick',
    whatItAddsToSong: 'Injects raw aggression, power, and high-energy rebellion into the track. Immediately sets a dark, confrontational warehouse or rave mood and demands physical attention.',
    synthRecipe: 'Synthesized sine wave sweep with heavy wave-shaping distortion and bit-crushing, boosted at 60Hz and 1.2kHz for crunch.',
    subgenres: ['industrial-hard', 'schranz', 'ebm-dark-synth'],
    webAudioPreset: { type: 'kick_rumble', freq: 58, decay: 0.35, distortion: 0.75 },
    likesCount: 115,
    createdAt: new Date(),
  },
  {
    id: 'snd-dub-sub-pulse',
    name: 'Dub Techno Sub-Woofer Pulse',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'deep dub techno sub bass pulse, warm meditative low-end, smooth sine wave sub, cavernous low frequency',
    whatItAddsToSong: 'Anchors the track with a soothing, meditative, chest-rumbling warmth without overpowering the mid-range chords. Gives the song an expansive, deep-water ocean feeling.',
    synthRecipe: 'Pure sine wave sub-oscillator at 45Hz with slow attack and long release, modulated subtly with LFO.',
    subgenres: ['dub-techno', 'hypnotic-minimal', 'detroit-techno'],
    webAudioPreset: { type: 'sub_bass', freq: 48, decay: 0.6, cutoff: 140 },
    likesCount: 84,
    createdAt: new Date(),
  },
  {
    id: 'snd-punchy-909-kick',
    name: 'Classic Punchy 909 Kick (Clean)',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'clean punchy 909 kick drum, tight sharp techno kick, classic TR-909 bass drum, clicky attack punch',
    whatItAddsToSong: 'The foundational element of all techno. A clean, punchy 909 kick provides the perfect rhythmic anchor without muddying the mix, leaving space for bass and synths to breathe.',
    synthRecipe: 'TR-909 original circuit: sine oscillator with pitch envelope sweep from 170Hz to 50Hz, shaped with a sharp attack click.',
    subgenres: ['detroit-techno', 'peak-time', 'dub-techno', 'acid-techno'],
    webAudioPreset: { type: 'kick_rumble', freq: 55, decay: 0.3, distortion: 0.1 },
    likesCount: 134,
    createdAt: new Date(),
  },
  {
    id: 'snd-deep-analog-bass',
    name: 'Deep Analog Moog-Style Bass',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'deep warm analog moog bass, smooth rolling bassline, rich low-pass filtered bass, vintage synthesizer bass',
    whatItAddsToSong: 'Adds warmth, richness, and organic character that pure digital basslines lack. The Moog-style filter sweep gives the low-end a living, breathing quality that keeps the groove interesting.',
    synthRecipe: 'Dual detuned sawtooth oscillators through a 4-pole transistor ladder low-pass filter with envelope modulation and subtle portamento.',
    subgenres: ['detroit-techno', 'melodic-techno', 'dub-techno', 'hypnotic-minimal'],
    webAudioPreset: { type: 'sub_bass', freq: 55, decay: 0.4, cutoff: 200 },
    likesCount: 91,
    createdAt: new Date(),
  },
  {
    id: 'snd-acid-bass-303',
    name: 'TB-303 Acid Bassline (Low Register)',
    category: 'Kicks & Low-End',
    sunoPromptDescription: 'tb-303 acid bassline low register, squelchy bass acid sequence, resonant low-frequency 303 pattern',
    whatItAddsToSong: 'Combines the rhythmic drive of a bassline with the psychedelic character of acid. The low-register 303 creates a squelchy, evolving bassline that never gets boring.',
    synthRecipe: 'TB-303 sawtooth oscillator with 18dB diode ladder filter, high resonance, sequenced in chromatic 16th-note pattern with accent and slide.',
    subgenres: ['acid-techno', 'psy-techno', '90s-rave'],
    webAudioPreset: { type: 'acid_303', freq: 65, cutoff: 400, resonance: 14, decay: 0.35 },
    likesCount: 108,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 2: ACID & SYNTHS (8 sounds)
  // =========================================================================
  {
    id: 'snd-tb303-acid-squelch',
    name: 'TB-303 Resonant Acid Squelch Lead',
    category: 'Acid & Synths',
    sunoPromptDescription: 'tb-303 resonant acid squelch synth lead, twisting acid filter sweep, hypnotic acid techno sequence, screaming resonance',
    whatItAddsToSong: 'The iconic soul of Acid Techno. It injects a psychedelic, mind-twisting evolution into the track. As the filter cutoff and resonance open and close, it creates a sense of escalating tension and euphoria that can carry an entire 6-minute song on its own.',
    synthRecipe: 'Sawtooth or Square wave oscillator into an 18dB/octave diode ladder filter with high resonance, accented step sequencing, and slide portamento.',
    subgenres: ['acid-techno', 'peak-time', '90s-rave', 'psy-techno'],
    webAudioPreset: { type: 'acid_303', cutoff: 750, resonance: 18, note: 'C2' },
    likesCount: 188,
    createdAt: new Date(),
  },
  {
    id: 'snd-hypnotic-fm-arp',
    name: 'Hypnotic Polyrhythmic FM Synth Arpeggio',
    category: 'Acid & Synths',
    sunoPromptDescription: 'hypnotic polyrhythmic fm synth arpeggio, metallic bell synth pattern, evolving minimal techno sequence, trippy synth loop',
    whatItAddsToSong: 'Adds intricate intellectual rhythm and hypnotic depth. By playing a 3-step or 5-step polyrhythm against a 4/4 beat, it creates an evolving weave that keeps the brain fascinated and prevents repetitiveness.',
    synthRecipe: '2-operator or 4-operator FM synthesis with a short bell decay, routed through ping-pong delay and low-pass filter automation.',
    subgenres: ['hypnotic-minimal', 'melodic-techno', 'dub-techno', 'psy-techno'],
    webAudioPreset: { type: 'synth_lead', freq: 440, decay: 0.25, cutoff: 1800 },
    likesCount: 126,
    createdAt: new Date(),
  },
  {
    id: 'snd-detroit-synth-lead',
    name: 'Detroit Soulful Futuristic Lead Synth',
    category: 'Acid & Synths',
    sunoPromptDescription: 'detroit techno soulful synth lead, futuristic warm analog lead, classic syncopated synth riff, emotional techno melody',
    whatItAddsToSong: 'Brings warmth, human emotion, and retro-futuristic soul to an otherwise mechanical beat. Connects the track to techno\'s Detroit origins and adds unforgettable melodic identity.',
    synthRecipe: 'Detuned dual-oscillator analog poly-synth with slight vibrato and chorus, playing syncopated sixteenth-note phrases.',
    subgenres: ['detroit-techno', 'melodic-techno', '90s-rave'],
    webAudioPreset: { type: 'synth_lead', freq: 330, decay: 0.4, cutoff: 1400 },
    likesCount: 91,
    createdAt: new Date(),
  },
  {
    id: 'snd-ebm-dark-bass-seq',
    name: 'EBM Cyberpunk Sequenced Bassline',
    category: 'Acid & Synths',
    sunoPromptDescription: 'ebm dark sequenced synth bassline, cyberpunk dark-wave bass, aggressive pulse sequence, distorted synthwave bass',
    whatItAddsToSong: 'Creates a menacing, cinematic cyberpunk atmosphere with a militant, marching drive. Gives the track an edgy gothic or industrial attitude.',
    synthRecipe: 'Pulse-width modulated square wave with short filter envelope and overdrive, sequenced in a steady 16th-note octave leap pattern.',
    subgenres: ['ebm-dark-synth', 'industrial-hard', 'peak-time'],
    webAudioPreset: { type: 'acid_303', cutoff: 500, resonance: 8, note: 'E1' },
    likesCount: 104,
    createdAt: new Date(),
  },
  {
    id: 'snd-supersaw-stab',
    name: 'Supersaw Trance-Techno Chord Stab',
    category: 'Acid & Synths',
    sunoPromptDescription: 'supersaw trance techno chord stab, wide detuned sawtooth chord, lush polyphonic stab, euphoric synth hit',
    whatItAddsToSong: 'Creates a massive, wide stereo sound that fills the entire frequency spectrum. Perfect for climactic drops and breakdowns where you need an instant wall of euphoric sound.',
    synthRecipe: '7-voice detuned sawtooth oscillator (JP-8000 style) with unison spread, sent through a gentle low-pass filter with short decay envelope.',
    subgenres: ['melodic-techno', 'peak-time', '90s-rave'],
    webAudioPreset: { type: 'synth_lead', freq: 261, decay: 0.5, cutoff: 2200 },
    likesCount: 77,
    createdAt: new Date(),
  },
  {
    id: 'snd-fm-metallic-seq',
    name: 'FM Metallic Sequenced Arpeggio',
    category: 'Acid & Synths',
    sunoPromptDescription: 'fm metallic sequenced arpeggio, dx7 bell tone pattern, crystalline fm synth sequence, metallic digital arpeggio',
    whatItAddsToSong: 'Adds digital clarity and precision to the mix. The FM bell tones cut through dense arrangements, providing rhythmic interest and a futuristic digital aesthetic.',
    synthRecipe: '4-operator FM synthesis (DX7-style) with inharmonic ratios, sequenced in 16th notes with velocity modulation.',
    subgenres: ['hypnotic-minimal', 'psy-techno', 'detroit-techno'],
    webAudioPreset: { type: 'fm_bell', freq: 660, decay: 0.6 },
    likesCount: 85,
    createdAt: new Date(),
  },
  {
    id: 'snd-saw-pad-sweep',
    name: 'Slow Sawtooth Pad Filter Sweep',
    category: 'Acid & Synths',
    sunoPromptDescription: 'slow sawtooth pad filter sweep, evolving analog pad texture, warm synth wash, gradual filter automation',
    whatItAddsToSong: 'Creates evolving textural movement in the background that keeps the track alive without being distracting. The slow filter sweep adds a sense of time passing and atmosphere deepening.',
    synthRecipe: 'Dual detuned sawtooth oscillators with slow LFO modulating a 24dB low-pass filter cutoff, long attack and release.',
    subgenres: ['melodic-techno', 'dub-techno', 'hypnotic-minimal'],
    webAudioPreset: { type: 'drone_pad', freq: 165, decay: 2.5, cutoff: 800 },
    likesCount: 72,
    createdAt: new Date(),
  },
  {
    id: 'snd-pluck-techno',
    name: 'Techno Pluck Synth Staccato',
    category: 'Acid & Synths',
    sunoPromptDescription: 'techno pluck synth staccato, sharp filtered pluck lead, tight envelope synth stab, rhythmic pluck sequence',
    whatItAddsToSong: 'Provides sharp, precise rhythmic punctuation that enhances the groove without taking up too much space. The tight envelope keeps the mix clean while adding melodic interest.',
    synthRecipe: 'Sawtooth oscillator with very short filter envelope (pluck), bandpass filter, and short amplitude decay.',
    subgenres: ['hypnotic-minimal', 'peak-time', 'detroit-techno'],
    webAudioPreset: { type: 'synth_lead', freq: 520, decay: 0.2, cutoff: 1000 },
    likesCount: 68,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 3: CHORDS & STABS (6 sounds)
  // =========================================================================
  {
    id: 'snd-dub-chord-stab',
    name: 'Dub Techno Tape-Delay Chord Stab',
    category: 'Chords & Stabs',
    sunoPromptDescription: 'dub techno minor chord stab with tape delay and reverb, spacious atmospheric chord hit, echoing minor 7th synth stab',
    whatItAddsToSong: 'Adds spatial dimension, mystery, and hypnotic atmosphere without cluttering the kick drum. Each stab echoes across the stereo field, creating an immersive 3D sonic environment.',
    synthRecipe: 'Minor 7th chord voiced on an analog synthesizer, filtered with a low-pass filter and sent into an analog tape echo with high feedback and reverb.',
    subgenres: ['dub-techno', 'hypnotic-minimal', 'detroit-techno', 'raw-warehouse'],
    webAudioPreset: { type: 'dub_chord', freq: 261, decay: 0.7, delay: true, reverb: true },
    likesCount: 176,
    createdAt: new Date(),
  },
  {
    id: 'snd-afterlife-cinematic-pad',
    name: 'Melodic Afterlife Cinematic Arp & Pad',
    category: 'Chords & Stabs',
    sunoPromptDescription: 'melodic techno afterlife style cinematic synth pad, emotional sweeping chords, dramatic arena techno chords, lush atmosphere',
    whatItAddsToSong: 'Transforms a club track into an emotional, goosebump-inducing stadium anthem. Provides the emotional release and dramatic euphoria during major breakdowns and climax drops.',
    synthRecipe: 'Lush super-saw polyphonic synthesizer with long attack and release, layered with a shimmer reverb and automated low-pass filter.',
    subgenres: ['melodic-techno', 'peak-time', 'detroit-techno'],
    webAudioPreset: { type: 'drone_pad', freq: 196, decay: 2.0, cutoff: 1200 },
    likesCount: 165,
    createdAt: new Date(),
  },
  {
    id: 'snd-industrial-metallic-stab',
    name: 'Industrial Metallic Anvil Chord Stab',
    category: 'Chords & Stabs',
    sunoPromptDescription: 'industrial metallic anvil chord stab, harsh warehouse metallic synth hit, dystopian metallic chord strike',
    whatItAddsToSong: 'Injects shocking percussive power and industrial warehouse grit. Acts as an aggressive rhythmic punctuation that shocks the dancer and emphasizes the groove.',
    synthRecipe: 'FM synthesis ring-modulating metallic frequencies, distorted through a bit-crusher and gated reverb room.',
    subgenres: ['industrial-hard', 'schranz', 'ebm-dark-synth', 'raw-warehouse'],
    webAudioPreset: { type: 'industrial_hit', freq: 600, decay: 0.25, distortion: 0.6 },
    likesCount: 89,
    createdAt: new Date(),
  },
  {
    id: 'snd-90s-hoover-stab',
    name: '90s Rave Hoover Lead & Piano Stab',
    category: 'Chords & Stabs',
    sunoPromptDescription: '90s rave hoover synth lead, euphoric warehouse piano chord stab, classic old school rave hit, energetic rave chords',
    whatItAddsToSong: 'Delivers pure euphoric nostalgia and instant dancefloor celebration. Instantly reminds listeners of legendary 1990s warehouse raves and festival anthems.',
    synthRecipe: 'Roland Alpha Juno hoover pulse-width modulation sound layered with a compressed Korg M1 house piano stab.',
    subgenres: ['90s-rave', 'schranz', 'peak-time'],
    webAudioPreset: { type: 'dub_chord', freq: 392, decay: 0.5, delay: false, reverb: true },
    likesCount: 112,
    createdAt: new Date(),
  },
  {
    id: 'snd-minor-pad-chord',
    name: 'Dark Minor Key Sustained Pad',
    category: 'Chords & Stabs',
    sunoPromptDescription: 'dark minor key sustained pad chord, ominous atmospheric synth pad, deep moody chord wash, cinematic dark pad',
    whatItAddsToSong: 'Establishes the emotional tone and mood of the entire track. A dark minor pad creates tension, mystery, and depth that makes the dancefloor feel like they\'re inside a film soundtrack.',
    synthRecipe: 'Slow-attack detuned saw/square oscillator cluster through a gentle low-pass filter with long reverb tail.',
    subgenres: ['melodic-techno', 'dub-techno', 'industrial-hard', 'ebm-dark-synth'],
    webAudioPreset: { type: 'drone_pad', freq: 147, decay: 2.2, cutoff: 500 },
    likesCount: 93,
    createdAt: new Date(),
  },
  {
    id: 'snd-euphoric-breakdown-chord',
    name: 'Euphoric Breakdown Major Chord Lift',
    category: 'Chords & Stabs',
    sunoPromptDescription: 'euphoric breakdown major chord lift, uplifting stadium techno chord, emotional major key synth swell, festival anthem chord',
    whatItAddsToSong: 'Creates the peak emotional moment in the track — the "hands in the air" moment. When the major chord hits during a breakdown, it provides cathartic release after tension.',
    synthRecipe: 'Multi-layered super-saw with major chord voicing, shimmer reverb, and automated filter opening.',
    subgenres: ['melodic-techno', 'peak-time', '90s-rave'],
    webAudioPreset: { type: 'dub_chord', freq: 330, decay: 0.9, delay: true, reverb: true },
    likesCount: 88,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 4: PERCUSSION & HATS (8 sounds)
  // =========================================================================
  {
    id: 'snd-909-hihat-gallop',
    name: '909 Open & Closed Hi-Hat Gallop',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'crisp 909 off-beat open hi-hat, driving 16th closed hat gallop, relentless techno hi-hat groove, energetic hats',
    whatItAddsToSong: 'The absolute engine of techno speed and excitement. The off-beat open hi-hat creates the signature "boots-and-cats" techno drive, making the track feel fast, crisp, and danceable.',
    synthRecipe: 'Roland TR-909 sample-based metallic hi-hats with slight saturation and high-pass filtering at 500Hz to sit above the mix.',
    subgenres: ['peak-time', 'acid-techno', 'raw-warehouse', 'schranz', 'detroit-techno'],
    webAudioPreset: { type: 'hihat_loop', freq: 6000, decay: 0.15 },
    likesCount: 154,
    createdAt: new Date(),
  },
  {
    id: 'snd-metallic-anvil-percussion',
    name: 'Metallic Anvil & Clanking Percussion',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'metallic anvil industrial percussion, iron clank percussion loop, warehouse metal pipe percussion, harsh industrial percussion',
    whatItAddsToSong: 'Adds raw industrial texture and mechanical precision. Replaces traditional bongos or shakers with the sound of a factory floor, giving the track a hard, dystopian authenticity.',
    synthRecipe: 'Metallic FM synthesis noise blast combined with recorded warehouse hammer strikes, compressed with fast attack.',
    subgenres: ['industrial-hard', 'ebm-dark-synth', 'raw-warehouse', 'schranz'],
    webAudioPreset: { type: 'industrial_hit', freq: 900, decay: 0.2, distortion: 0.5 },
    likesCount: 97,
    createdAt: new Date(),
  },
  {
    id: 'snd-tribal-conga-groove',
    name: 'Hypnotic Tribal Conga & Rimshot Groove',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'hypnotic tribal conga percussion groove, organic syncopated rimshot loop, warm hypnotic techno percussion',
    whatItAddsToSong: 'Infuses organic, human warmth and tribal hypnotism into electronic beats. Keeps the body moving in a fluid, natural sway while contrasting with synthetic synthesizer sounds.',
    synthRecipe: 'Acoustic congas and wood rimshots tuned to the track key, treated with subtle room reverb and swing timing.',
    subgenres: ['hypnotic-minimal', 'dub-techno', 'detroit-techno'],
    webAudioPreset: { type: 'tom_analog', freq: 300, decay: 0.18 },
    likesCount: 82,
    createdAt: new Date(),
  },
  {
    id: 'snd-schranz-compressed-loop',
    name: 'Schranz Ultra-Fast Filtered Perc Loop',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'ultra-fast schranz techno percussion loop, heavily compressed distorted percussion roll, relentless 155 bpm groove',
    whatItAddsToSong: 'Creates overwhelming momentum and breathless energy. Perfect for fast hard techno tracks where the dancefloor needs constant, unbroken sonic adrenaline.',
    synthRecipe: 'Breakbeat loop sliced into 16th notes, high-pass filtered, distorted, and smashed with a brickwall limiter.',
    subgenres: ['schranz', 'industrial-hard', 'acid-techno'],
    webAudioPreset: { type: 'hihat_loop', freq: 4500, decay: 0.1 },
    likesCount: 76,
    createdAt: new Date(),
  },
  {
    id: 'snd-909-clap',
    name: 'TR-909 Snappy Clap',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'crisp snappy 909 clap, classic drum machine clap, tight reverb clap hit, punchy techno clap',
    whatItAddsToSong: 'Provides the essential backbeat accent in techno. The 909 clap on beats 2 and 4 (or offbeat) creates the classic techno rhythmic skeleton that dancers lock onto.',
    synthRecipe: 'TR-909 clap: layered noise bursts through bandpass filter with reverb tail.',
    subgenres: ['peak-time', 'acid-techno', 'detroit-techno', 'raw-warehouse'],
    webAudioPreset: { type: 'clap_909', decay: 0.2 },
    likesCount: 120,
    createdAt: new Date(),
  },
  {
    id: 'snd-909-snare',
    name: 'TR-909 Techno Snare',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'punchy 909 snare drum, crisp techno snare hit, classic drum machine snare, sharp snappy snare',
    whatItAddsToSong: 'Cuts through the mix with a sharp, defined attack. Essential for builds and snare rolls that create tension before the drop.',
    synthRecipe: 'TR-909 snare: triangle oscillator body layered with filtered white noise burst.',
    subgenres: ['peak-time', 'acid-techno', 'schranz', '90s-rave'],
    webAudioPreset: { type: 'snare_909', decay: 0.18 },
    likesCount: 105,
    createdAt: new Date(),
  },
  {
    id: 'snd-rimshot-click',
    name: 'Techno Rimshot Click Percussion',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'techno rimshot click, short sharp rim hit, minimal percussion accent, wooden rim percussion',
    whatItAddsToSong: 'Adds subtle rhythmic detail and syncopation without cluttering the mix. The rimshot sits perfectly between the kick and hi-hat, filling the groove with micro-rhythmic interest.',
    synthRecipe: 'Short triangle oscillator burst with pitch sweep, tuned to a specific note.',
    subgenres: ['hypnotic-minimal', 'dub-techno', 'detroit-techno', 'raw-warehouse'],
    webAudioPreset: { type: 'percussion_rim', freq: 800, decay: 0.08 },
    likesCount: 63,
    createdAt: new Date(),
  },
  {
    id: 'snd-woodblock-perc',
    name: 'Hypnotic Woodblock & Cowbell Perc',
    category: 'Percussion & Hats',
    sunoPromptDescription: 'hypnotic woodblock percussion, metallic cowbell accent, minimal techno woodblock groove, syncopated cowbell',
    whatItAddsToSong: 'Provides a distinctive, recognizable accent that gives the track its own character. The woodblock/cowbell sits high in the mix and creates a hypnotic repeating pattern.',
    synthRecipe: 'FM synthesis tuned to inharmonic frequencies, short decay, bandpass filtered.',
    subgenres: ['hypnotic-minimal', 'detroit-techno', 'dub-techno'],
    webAudioPreset: { type: 'fm_bell', freq: 587, decay: 0.15 },
    likesCount: 58,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 5: ATMOSPHERE & FX (8 sounds)
  // =========================================================================
  {
    id: 'snd-warehouse-drone-pad',
    name: 'Dark Warehouse Drone Pad & Cavern Reverb',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'dark warehouse drone pad, cavernous acoustic reverb atmosphere, mysterious underground techno ambient texture, industrial drone',
    whatItAddsToSong: 'Creates the immense physical sensation of being inside a massive underground concrete warehouse at 4 AM. Adds emotional gravity, darkness, and immersive depth to the background of the song.',
    synthRecipe: 'Detuned saw/square cluster chord pitched down 2 octaves, sent into a 10-second impulse response cathedral/warehouse reverb.',
    subgenres: ['peak-time', 'industrial-hard', 'raw-warehouse', 'dub-techno', 'ebm-dark-synth'],
    webAudioPreset: { type: 'drone_pad', freq: 110, decay: 2.5, cutoff: 600 },
    likesCount: 161,
    createdAt: new Date(),
  },
  {
    id: 'snd-white-noise-riser',
    name: 'White Noise Riser & Filter Exhaust Sweep',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'white noise riser sweep, filter opening exhaust sweep fx, tension building techno riser, dramatic build up fx',
    whatItAddsToSong: 'The ultimate tool for building psychological anticipation and excitement before the drop. It signals to the dancefloor that an explosive release of energy is coming.',
    synthRecipe: 'White noise generator fed into a resonant 24dB low-pass filter whose cutoff frequency rises over 8 or 16 bars.',
    subgenres: ['peak-time', 'melodic-techno', 'acid-techno', '90s-rave', 'schranz'],
    webAudioPreset: { type: 'riser_fx', freq: 1000, decay: 1.8, cutoff: 3000 },
    likesCount: 139,
    createdAt: new Date(),
  },
  {
    id: 'snd-siren-drop-alert',
    name: 'Classic Rave Siren & Alarm FX',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'classic rave siren alert fx, warehouse alarm synth sweep, 90s party siren sample, high tension alarm fx',
    whatItAddsToSong: 'Creates an electrifying moment of alarm and peak-time euphoria. Commands instant attention and acts as a legendary rave trigger that gets hands in the air.',
    synthRecipe: 'LFO modulating the pitch of a square wave synthesizer in a slow upward/downward siren curve with delay.',
    subgenres: ['90s-rave', 'peak-time', 'acid-techno', 'schranz'],
    webAudioPreset: { type: 'noise_fx', freq: 800, decay: 1.2, cutoff: 2200 },
    likesCount: 93,
    createdAt: new Date(),
  },
  {
    id: 'snd-reverse-crash',
    name: 'Reverse Cymbal Crash Build-Up',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'reverse cymbal crash build-up, reverse crash sweep, rising metallic cymbal reverse, tension reverse splash',
    whatItAddsToSong: 'Creates a "breath intake" sensation before the drop. The reverse crash acts as a sonic vacuum that pulls the listener forward, making the next section hit with maximum impact.',
    synthRecipe: 'Reversed white noise burst through high-pass filter with exponential volume swell.',
    subgenres: ['melodic-techno', 'peak-time', '90s-rave', 'acid-techno'],
    webAudioPreset: { type: 'reverse_cymbal', decay: 1.0 },
    likesCount: 86,
    createdAt: new Date(),
  },
  {
    id: 'snd-laser-zap-fx',
    name: 'Psytrance Laser Zap FX',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'psytrance laser zap fx, descending pitch zap sweep, sci-fi laser shot effect, retro arcade zap',
    whatItAddsToSong: 'Injects playful, energetic sci-fi excitement into the track. Each zap creates a moment of surprise and delight, especially effective in psy-techno and acid tracks.',
    synthRecipe: 'Sawtooth oscillator with rapid pitch sweep from high to low through distortion.',
    subgenres: ['psy-techno', 'acid-techno', '90s-rave'],
    webAudioPreset: { type: 'laser_zap', freq: 2000, decay: 0.25 },
    likesCount: 74,
    createdAt: new Date(),
  },
  {
    id: 'snd-glitch-texture',
    name: 'Glitchy Granular Texture FX',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'glitchy granular texture fx, stuttered digital glitch, granular noise burst, fragmented audio texture',
    whatItAddsToSong: 'Adds digital chaos and unpredictability that keeps the listener\'s brain engaged. The glitch textures create moments of controlled disorder within an otherwise structured groove.',
    synthRecipe: 'Granular synthesis with random grain sizes and pitches, bandpass filtered.',
    subgenres: ['psy-techno', 'hypnotic-minimal', 'industrial-hard'],
    webAudioPreset: { type: 'glitch_granular', decay: 0.4 },
    likesCount: 67,
    createdAt: new Date(),
  },
  {
    id: 'snd-distorted-screech-fx',
    name: 'Harsh Distorted Screech FX',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'harsh distorted screech fx, industrial screech sweep, aggressive feedback noise, raw distorted texture',
    whatItAddsToSong: 'Creates moments of raw, uncontrolled energy that shock and excite. The screech is the "danger" element in industrial and hard techno, adding primal aggression.',
    synthRecipe: 'Sawtooth oscillator with heavy wave-shaping distortion and bandpass filter sweep.',
    subgenres: ['industrial-hard', 'schranz', 'ebm-dark-synth'],
    webAudioPreset: { type: 'distorted_screech', freq: 1200, decay: 0.5, distortion: 0.8 },
    likesCount: 71,
    createdAt: new Date(),
  },
  {
    id: 'snd-vinyl-hiss',
    name: 'Warm Vinyl Hiss & Crackle Texture',
    category: 'Atmosphere & FX',
    sunoPromptDescription: 'warm vinyl hiss and crackle texture, analog record noise, lo-fi vinyl surface noise, nostalgic vinyl crackle',
    whatItAddsToSong: 'Adds warmth, nostalgia, and an organic "analog" quality that digital-only tracks lack. The subtle vinyl texture makes the track feel like it was pressed on a real record.',
    synthRecipe: 'Filtered white noise with random amplitude modulation to simulate crackle.',
    subgenres: ['dub-techno', 'detroit-techno', 'hypnotic-minimal'],
    webAudioPreset: { type: 'noise_fx', freq: 4000, decay: 2.0, cutoff: 8000 },
    likesCount: 59,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 6: VOCALS & CHANTS (4 sounds)
  // =========================================================================
  {
    id: 'snd-cyberpunk-spoken-hook',
    name: 'Hypnotic Cyberpunk Spoken Monologue',
    category: 'Vocals & Chants',
    sunoPromptDescription: 'hypnotic female spoken word monologue, cyberpunk sci-fi vocal hook, cold detached female vocal narrative, robotic German spoken word',
    whatItAddsToSong: 'Gives the track a cool, intellectual, and futuristic narrative identity. Unlike sung pop vocals, spoken techno hooks create a hypnotic, cinematic cyberpunk aesthetic that makes the track memorable and iconic.',
    synthRecipe: 'Recorded spoken word voice compressed and treated with short stereo slap-back delay and high-pass filter.',
    subgenres: ['peak-time', 'ebm-dark-synth', 'melodic-techno', 'raw-warehouse'],
    webAudioPreset: { type: 'vocal_hook', freq: 300, decay: 0.5, cutoff: 1500 },
    likesCount: 171,
    createdAt: new Date(),
  },
  {
    id: 'snd-robotic-vocoder-hook',
    name: 'Robotic Vocoder & Synthesized Countdown',
    category: 'Vocals & Chants',
    sunoPromptDescription: 'robotic vocoder vocal hook, synthesized robotic countdown, vocoder techno vocals, machine voice chant',
    whatItAddsToSong: 'Reinforces the machine-age, cyborg aesthetic of techno music. Adds an infectious robotic hook that blends seamlessly with synthesizers without breaking the underground atmosphere.',
    synthRecipe: 'Vocal signal modulating an analog synthesizer carrier wave through a 16-band vocoder with robotic pitch correction.',
    subgenres: ['ebm-dark-synth', 'detroit-techno', 'acid-techno', 'industrial-hard'],
    webAudioPreset: { type: 'vocal_hook', freq: 220, decay: 0.4, cutoff: 1000 },
    likesCount: 119,
    createdAt: new Date(),
  },
  {
    id: 'snd-dark-whispered-chant',
    name: 'Dark Whispered Choral Ritual Chant',
    category: 'Vocals & Chants',
    sunoPromptDescription: 'dark whispered ritual chant, mysterious choral vocal loop, hypnotic whispered vocal chant, occult warehouse vocal atmosphere',
    whatItAddsToSong: 'Adds an eerie, occult, and hypnotic mystique. Draws the listener deep into an underground ritualistic trance that feels both thrilling and otherworldly.',
    synthRecipe: 'Whispered voice recordings layered with Gregorian choir samples, drenched in dark cavern reverb and reverse delay.',
    subgenres: ['hypnotic-minimal', 'industrial-hard', 'melodic-techno', 'dub-techno'],
    webAudioPreset: { type: 'vocal_hook', freq: 180, decay: 0.8, cutoff: 800 },
    likesCount: 108,
    createdAt: new Date(),
  },
  {
    id: 'snd-chopped-vocal-stab',
    name: 'Chopped Vocal Stab & Stutter',
    category: 'Vocals & Chants',
    sunoPromptDescription: 'chopped vocal stab stutter, sliced vocal hit, stuttered vocal chop, rhythmic vocal fragment',
    whatItAddsToSong: 'Turns a human voice into a percussive instrument. The chopped vocal becomes part of the rhythm section, adding a human touch to mechanical beats while creating catchy, memorable hooks.',
    synthRecipe: 'Vocal sample sliced into 16th-note fragments with varying pitch and amplitude.',
    subgenres: ['peak-time', '90s-rave', 'melodic-techno'],
    webAudioPreset: { type: 'glitch_granular', decay: 0.25 },
    likesCount: 83,
    createdAt: new Date(),
  },

  // =========================================================================
  // CATEGORY 7: ARRANGEMENT & STRUCTURE (5 sounds)
  // =========================================================================
  {
    id: 'snd-acid-filter-build',
    name: 'Low-Pass to High-Pass Acid Filter Sweep Build',
    category: 'Arrangement & Structure',
    sunoPromptDescription: 'rising acid filter sweep build-up, opening low-pass filter tension build, snare roll crescendo, peak tension before drop',
    whatItAddsToSong: 'Provides the structural glue between sections. By slowly opening a filter over 16 bars, it creates unbearable tension that makes the subsequent bass drop hit with 10x more impact.',
    synthRecipe: 'Automated 24dB filter cutoff and resonance on the lead synth and drums rising continuously before a bar of silence.',
    subgenres: ['acid-techno', 'peak-time', 'melodic-techno', 'schranz', '90s-rave'],
    webAudioPreset: { type: 'riser_fx', freq: 600, decay: 1.5, cutoff: 2800 },
    likesCount: 132,
    createdAt: new Date(),
  },
  {
    id: 'snd-vacuum-drop-pause',
    name: '1-Bar Silent Vacuum Drop Pause',
    category: 'Arrangement & Structure',
    sunoPromptDescription: 'sudden 1-bar silent pause before drop, vacuum breath pause, dramatic silence before heavy bass drop',
    whatItAddsToSong: 'The most powerful trick in techno arrangement: absolute silence. By cutting all sound for one second right before the kick returns, it creates a breathtaking gasp in the crowd before the floor explodes.',
    synthRecipe: 'Master volume mute or sidechain gate cutting all reverb tails for 1 bar before the downbeat of the drop.',
    subgenres: ['peak-time', 'industrial-hard', 'raw-warehouse', 'acid-techno'],
    webAudioPreset: { type: 'riser_fx', freq: 120, decay: 0.3, cutoff: 400 },
    likesCount: 147,
    createdAt: new Date(),
  },
  {
    id: 'snd-snare-roll-build',
    name: 'Snare Roll Crescendo Build',
    category: 'Arrangement & Structure',
    sunoPromptDescription: 'snare roll crescendo build, accelerating snare drum roll, 16-bar snare build-up, explosive drum roll tension',
    whatItAddsToSong: 'The classic DJ tool for building energy. The snare roll accelerates from quarter notes to 32nd notes, creating explosive tension that releases into the drop.',
    synthRecipe: 'TR-909 snare hits increasing in density from 1/4 to 1/32 notes with rising high-pass filter and volume.',
    subgenres: ['peak-time', 'acid-techno', 'schranz', '90s-rave'],
    webAudioPreset: { type: 'snare_909', decay: 0.15 },
    likesCount: 118,
    createdAt: new Date(),
  },
  {
    id: 'snd-downlifter-impact',
    name: 'Downlifter Impact & Boom FX',
    category: 'Arrangement & Structure',
    sunoPromptDescription: 'downlifter impact boom fx, sub bass drop impact, dramatic low-end boom, section transition impact',
    whatItAddsToSong: 'Marks the transition between sections with authority. The downlifter creates a sense of weight and finality, telling the listener "we\'re moving to a new part now."',
    synthRecipe: 'White noise falling through a low-pass filter combined with a sub-bass sine boom with long decay.',
    subgenres: ['peak-time', 'melodic-techno', 'industrial-hard', '90s-rave'],
    webAudioPreset: { type: 'noise_fx', freq: 2000, decay: 0.8, cutoff: 200 },
    likesCount: 95,
    createdAt: new Date(),
  },
  {
    id: 'snd-dj-friendly-outro',
    name: 'DJ-Friendly Filtered Outro',
    category: 'Arrangement & Structure',
    sunoPromptDescription: 'dj-friendly filtered outro, high-pass filtered drums fading, minimal outro percussion loop, clean ending for dj mix',
    whatItAddsToSong: 'Essential for any track meant to be played by DJs. The filtered outro allows smooth mixing into the next track, maintaining the groove while gradually removing elements.',
    synthRecipe: 'Master signal through a rising high-pass filter with reverb tail and gradual volume fade.',
    subgenres: ['peak-time', 'detroit-techno', 'dub-techno', 'acid-techno'],
    webAudioPreset: { type: 'hihat_loop', freq: 3000, decay: 0.5 },
    likesCount: 70,
    createdAt: new Date(),
  },
];

// =============================================================================
// RECIPES — Curated track templates
// =============================================================================
export const INITIAL_RECIPES: TechnoRecipe[] = [
  {
    id: 'rec-peaktime-berlin-303',
    title: 'Berlin Warehouse Midnight 303 Peak-Time',
    subgenreId: 'sub-peaktime',
    bpm: 132,
    stylePrompt: 'peak-time techno, 132 bpm, driving 909 kick, rolling sidechain sub-bass, tb-303 acid lead, dark warehouse atmosphere',
    lyricsArrangement: `[Intro - Dark Warehouse Drone Pad & Hypnotic Off-Beat Hi-Hats]
[Verse 1 - Enter Rolling 16th-Note Sub Bassline & Crisp 909 Drums]
(Spoken Cyberpunk Monologue: "We enter the machine. Midnight in Berlin. Close your eyes and feel the frequency.")

[Build - TB-303 Resonant Acid Squelch Lead Rising & White Noise Sweep]
[Drop - Full 909 Rumble Kick, Rolling Sub Bass & Screaming 303 Acid Lead]
[Breakdown - Cavernous Reverb Wash & Whispered Female Chant]
[Drop 2 - Full Relentless Peak-Time Groove & Industrial Percussion]
[Outro - High-Pass Filtered Drums Fading into Drone Atmosphere]`,
    soundIds: ['snd-909-rumble-kick', 'snd-rolling-sub-bass', 'snd-tb303-acid-squelch', 'snd-909-hihat-gallop', 'snd-warehouse-drone-pad', 'snd-cyberpunk-spoken-hook'],
    explanation: 'Why this works in Suno.AI: The combination of "peak-time techno" with specific hardware keywords like "909 kick" and "tb-303 acid lead" forces Suno\'s audio engine to use authentic synthesized club timbres. The structured arrangement tags [Intro], [Build], [Drop], and [Breakdown] ensure the AI creates a professional club arrangement rather than a random jam.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-dub-techno-deep',
    title: 'Basic Channel Oceanic Dub Techno Ritual',
    subgenreId: 'sub-dub',
    bpm: 122,
    stylePrompt: 'dub techno, 122 bpm, deep minor chord stabs, tape delay reverb wash, sub bass pulse, vinyl hiss, meditative groove',
    lyricsArrangement: `[Intro - Deep Tape Delay Reverb Wash & Vinyl Hiss]
[Verse - Meditative Sub-Woofer Pulse & Warm Analog Kick Drum]
[Chorus - Echoing Minor 7th Dub Techno Tape-Delay Chord Stabs]
[Breakdown - Spatial Cavern Reverb & Subtle Tribal Conga Groove]
[Drop - Hypnotic Meditative Dub Techno Groove with Evolving Chord Echoes]
[Outro - Echoing Stabs Slowly Fading into Deep Ocean Reverb]`,
    soundIds: ['snd-dub-sub-pulse', 'snd-dub-chord-stab', 'snd-tribal-conga-groove', 'snd-warehouse-drone-pad'],
    explanation: 'Why this works in Suno.AI: "tape delay reverb wash" and "minor chord stabs" signal Suno to apply spatial delay effects and lush meditative chords. Keeping the BPM at 122 ensures the deep hypnotic pacing of authentic Basic Channel / Berlin dub techno.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-industrial-hard-cyberpunk',
    title: 'Dystopian Iron Forge Industrial Hard Techno',
    subgenreId: 'sub-industrial',
    bpm: 145,
    stylePrompt: 'hard industrial techno, 145 bpm, distorted rumble kick, metallic anvil percussion, dark cyberpunk dystopia, harsh textures',
    lyricsArrangement: `[Intro - Dark Dystopian Siren Alert & Metallic Pipe Clatter]
[Verse - Aggressive Distorted Industrial Kick Drum & Harsh Anvil Percussion]
(Robotic Vocoder Hook: "SYSTEM OVERRIDE. ZERO POINT ENERGY. DESTROY THE ARCHIVE.")

[Build - Rapid Snare Roll & Rising Industrial Overdrive]
[Drop - Heavy Distorted 909 Rumble Kick & Schranz Fast Loop]
[Breakdown - Dark Whispered Occult Chant & Warehouse Echoes]
[Drop 2 - Maximum Industrial Hard Techno Intensity & Metallic Stabs]
[Outro - Distorted Kick Decaying into Industrial Drone]`,
    soundIds: ['snd-industrial-distorted-kick', 'snd-metallic-anvil-percussion', 'snd-industrial-metallic-stab', 'snd-robotic-vocoder-hook', 'snd-siren-drop-alert'],
    explanation: 'Why this works in Suno.AI: Using "distorted rumble kick", "metallic anvil percussion", and "145 bpm" prompts Suno to generate aggressive, high-energy industrial sound design. Adding uppercase robotic vocals in the arrangement box creates iconic cyberpunk hooks.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-melodic-afterlife-stadium',
    title: 'Afterlife Celestial Horizon Melodic Anthem',
    subgenreId: 'sub-melodic',
    bpm: 124,
    stylePrompt: 'melodic techno, 124 bpm, afterlife style, cinematic analog synth arpeggio, emotional minor chords, rolling bassline, epic atmosphere',
    lyricsArrangement: `[Intro - Cinematic Analog Synth Pad & Gentle Atmospheric Noise]
[Verse 1 - Enter Rolling Sub Bassline & Syncopated 909 Rimshot]
[Build - Emotional Sweeping Afterlife Synth Arpeggio Opening Filter]
[Drop - Lush Stadium Melodic Techno Anthem with Rolling Bass & Arp]
[Breakdown - Dramatic Orchestral Synth Drone & Emotional Release]
[Drop 2 - Peak Cinematic Afterlife Anthem & Sweeping Lead Melody]
[Outro - Arpeggio Fading into Lush Space Reverb]`,
    soundIds: ['snd-afterlife-cinematic-pad', 'snd-rolling-sub-bass', 'snd-hypnotic-fm-arp', 'snd-white-noise-riser'],
    explanation: 'Why this works in Suno.AI: "afterlife style" and "cinematic analog synth arpeggio" guide Suno to produce lush, emotional melodic techno with sweeping synthesizers and dramatic breakdowns, perfect for festival anthems.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-acid-techno-303-odyssey',
    title: 'TB-303 Acid Warehouse Odyssey',
    subgenreId: 'sub-acid',
    bpm: 138,
    stylePrompt: 'acid techno, 138 bpm, tb-303 resonant acid squelch, filter sweep lead, punchy 909 kick drum, psychedelic acid riff, high energy',
    lyricsArrangement: `[Intro - Squelching 303 Acid Bassline with Low Cutoff Frequency]
[Verse - Punchy 909 Kick & Off-Beat Open Hi-Hat Gallop]
[Build - TB-303 Resonance Screaming & 16-Bar Filter Rising Sweep]
[Drop - Full Psychedelic Acid Techno Drop with Twisting 303 Riff]
[Breakdown - 1-Bar Silent Vacuum Pause & Trippy FM Arpeggio]
[Drop 2 - Relentless Acid Techno Climax with Double 303 Leads]
[Outro - Acid Filter Cutoff Sweeping Downwards to Close]`,
    soundIds: ['snd-tb303-acid-squelch', 'snd-909-hihat-gallop', 'snd-acid-filter-build', 'snd-vacuum-drop-pause'],
    explanation: 'Why this works in Suno.AI: By explicitly specifying "tb-303 resonant acid squelch" and describing filter sweep transitions in the arrangement tags, Suno mimics an analog acid synthesizer performance with rising and falling resonance.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-detroit-soulful-futurism',
    title: 'Detroit Motor City 909 Soulful Futurism',
    subgenreId: 'sub-detroit',
    bpm: 128,
    stylePrompt: 'detroit techno, 128 bpm, classic 909 drum machine, soulful synth strings, futuristic chord stab, syncopated groove, warm analog',
    lyricsArrangement: `[Intro - Classic 909 Syncopated Rhythm & Warm Analog Noise]
[Verse - Warm Soulful Detroit Poly-Synth Strings & Off-Beat Hats]
[Chorus - Syncopated Futuristic Detroit Lead Riff & Warm Sub Bass]
[Breakdown - Emotional Detroit Chord Progression & Minimal Beats]
[Drop - Full Classic Detroit Techno Groove with Soulful Lead Riff]
[Outro - Warm Analog Strings Slowly Fading Out]`,
    soundIds: ['snd-detroit-synth-lead', 'snd-dub-chord-stab', 'snd-909-hihat-gallop', 'snd-rolling-sub-bass'],
    explanation: 'Why this works in Suno.AI: Combining "detroit techno" with "soulful synth strings" and "syncopated groove" produces the authentic, timeless sound of 1980s/1990s Detroit techno pioneers like Derrick May and Juan Atkins.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-ebm-dark-synthwave',
    title: 'Cyberpunk EBM Dark Synth March',
    subgenreId: 'sub-ebm',
    bpm: 130,
    stylePrompt: 'ebm dark techno, 130 bpm, sequenced rolling synth bassline, cyberpunk atmosphere, robotic vocoder, dark synthwave fusion, driving',
    lyricsArrangement: `[Intro - Cyberpunk Sequenced Pulse Bassline & Marching Kick]
[Verse - Enter Metallic Percussion & Dark Gothic Synth Riff]
(Spoken Cyberpunk Hook: "Neon rain on concrete street. The digital pulse never stops. Integrate.")

[Chorus - Robotic Vocoder Chant & Aggressive EBM Synth Lead]
[Breakdown - Industrial Drone Pad & Distorted Countdown]
[Drop - Full Dark EBM Cyberpunk Groove & Sequenced Bassline]
[Outro - Marching Bassline Decaying into Cyberpunk Atmosphere]`,
    soundIds: ['snd-ebm-dark-bass-seq', 'snd-cyberpunk-spoken-hook', 'snd-robotic-vocoder-hook', 'snd-industrial-metallic-stab'],
    explanation: 'Why this works in Suno.AI: Specifying "ebm dark techno" and "sequenced rolling synth bassline" merges industrial body music with cyberpunk synthwave, creating an edgy, cinematic vocal techno track.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-schranz-155-relentless',
    title: 'Schranz 155 BPM High-Octane Loop Drive',
    subgenreId: 'sub-schranz',
    bpm: 155,
    stylePrompt: 'schranz hard techno, 155 bpm, fast relentless distorted kick, aggressive percussion loop, high energy warehouse rave, intense speed',
    lyricsArrangement: `[Intro - Fast 155 BPM Filtered Breakbeat Percussion Loop]
[Verse - Enter Distorted Schranz Kick & Relentless Hi-Hat Gallop]
[Build - Rapid Filter Sweep & Rave Siren Alarm]
[Drop - Explosive 155 BPM Schranz Relentless Groove]
[Breakdown - Short 4-Bar Tension Pause & Metallic Anvil Hit]
[Drop 2 - Maximum Ultra-Fast Schranz Loop Power]
[Outro - DJ Friendly DJ Fade with Filtered Percussion]`,
    soundIds: ['snd-industrial-distorted-kick', 'snd-schranz-compressed-loop', 'snd-siren-drop-alert', 'snd-metallic-anvil-percussion'],
    explanation: 'Why this works in Suno.AI: The combination of "schranz hard techno", "155 bpm", and "fast relentless distorted kick" instructs Suno to deliver high-speed German loop techno without slowing down.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  // =========================================================================
  // NEW RECIPES
  // =========================================================================
  {
    id: 'rec-psytechno-gallop',
    title: 'Psychedelic Darkroom Gallop',
    subgenreId: 'sub-psytechno',
    bpm: 138,
    stylePrompt: 'psy-techno, 138 bpm, psychedelic fm synth sweep, galloping sub bassline, trippy glitch percussion, dark hypnotic',
    lyricsArrangement: `[Intro - FM Metallic Bell Tone Arpeggio & Dark Atmosphere]
[Verse - Galloping Sub Bassline & Punchy Kick Drum]
[Build - Psychedelic Laser Zap FX Rising & Glitch Texture]
[Drop - Full Psychedelic Techno Groove with FM Sweeps]
[Breakdown - Granular Glitch Texture & Reverse Cymbal]
[Drop 2 - Maximum Psychedelic Intensity & Dual FM Leads]
[Outro - Bell Tone Arpeggio Fading into Vinyl Hiss]`,
    soundIds: ['snd-hypnotic-fm-arp', 'snd-laser-zap-fx', 'snd-glitch-texture', 'snd-reverse-crash'],
    explanation: 'Why this works in Suno.AI: "psy-techno" combined with "psychedelic fm synth sweep" and "trippy glitch percussion" tells Suno to create a mind-bending hybrid of techno and psytrance.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-90s-rave-euphoria',
    title: 'Warehouse Rave Euphoria 1994',
    subgenreId: 'sub-rave90s',
    bpm: 140,
    stylePrompt: '90s rave techno, 140 bpm, hoover synth lead, euphoric rave chord stab, breakbeat roll, warehouse party energy',
    lyricsArrangement: `[Intro - Classic Rave Siren & Hoover Synth Rising]
[Verse - 909 Kick & Breakbeat Roll with Euphoric Piano Stabs]
(Spoken Hook: "Hands in the air. Feel the bass. Warehouse forever.")

[Build - Hoover Lead Screaming & Snare Roll Crescendo]
[Drop - Full 90s Rave Euphoria with Hoover & Piano]
[Breakdown - Emotional Breakdown with Whispered Chant]
[Drop 2 - Maximum Rave Energy & Hoover Lead Solo]
[Outro - Filtered Drums & Nostalgic Fade Out]`,
    soundIds: ['snd-90s-hoover-stab', 'snd-909-clap', 'snd-909-snare', 'snd-siren-drop-alert'],
    explanation: 'Why this works in Suno.AI: "90s rave techno" with "hoover synth lead" and "euphoric rave chord stab" produces pure nostalgic warehouse rave energy reminiscent of legendary 1990s parties.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
  {
    id: 'rec-raw-warehouse',
    title: 'Raw Concrete Warehouse Hypnotic Session',
    subgenreId: 'sub-raw',
    bpm: 136,
    stylePrompt: 'raw warehouse techno, 136 bpm, analog saturated 909 kick, hypnotic minimal percussion, dark warehouse acoustics, unpolished groove',
    lyricsArrangement: `[Intro - Vinyl Hiss & Dark Warehouse Drone Pad]
[Verse - Analog Saturated 909 Kick & Minimal Rimshot Groove]
[Build - Subtle Filter Sweep on Sawtooth Pad]
[Drop - Raw Hypnotic Warehouse Groove with Deep Sub Bass]
[Breakdown - Dark Minor Pad Chord & Minimal Percussion]
[Drop 2 - Full Raw Analog Warehouse Session]
[Outro - Filtered Kick & Warehouse Drone Fade]`,
    soundIds: ['snd-punchy-909-kick', 'snd-rimshot-click', 'snd-saw-pad-sweep', 'snd-vinyl-hiss'],
    explanation: 'Why this works in Suno.AI: "raw warehouse techno" with "analog saturated 909 kick" and "unpolished groove" tells Suno to keep things gritty, minimal, and focused on raw groove over polish.',
    author: 'Vortex Techno Forge',
    createdAt: new Date(),
  },
];
