import { NextResponse } from 'next/server';
import { db } from '@/db';
import { technoSounds } from '@/db/schema';
import { INITIAL_SOUNDS } from '@/lib/seed-data';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subgenre = searchParams.get('subgenre');
    const search = searchParams.get('search')?.toLowerCase();

    let sounds = await db.select().from(technoSounds).orderBy(desc(technoSounds.likesCount));
    
    if (sounds.length === 0) {
      for (const snd of INITIAL_SOUNDS) {
        await db.insert(technoSounds).values(snd).onConflictDoNothing();
      }
      sounds = await db.select().from(technoSounds).orderBy(desc(technoSounds.likesCount));
    }

    let filtered = sounds;
    if (category && category !== 'All') {
      filtered = filtered.filter((s) => s.category === category);
    }
    if (subgenre && subgenre !== 'All') {
      filtered = filtered.filter((s) => s.subgenres.includes(subgenre));
    }
    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.sunoPromptDescription.toLowerCase().includes(search) ||
          s.whatItAddsToSong.toLowerCase().includes(search) ||
          s.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (error: any) {
    console.error('Error fetching sounds:', error);
    return NextResponse.json({ success: true, data: INITIAL_SOUNDS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      sunoPromptDescription,
      whatItAddsToSong,
      synthRecipe,
      subgenres,
      webAudioPreset,
    } = body;

    if (!name || !category || !sunoPromptDescription || !whatItAddsToSong) {
      return NextResponse.json(
        { success: false, error: 'Missing required sound fields' },
        { status: 400 }
      );
    }

    const id = `snd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newSound = {
      id,
      name,
      category,
      sunoPromptDescription,
      whatItAddsToSong,
      synthRecipe: synthRecipe || 'Custom synthesized sound',
      subgenres: Array.isArray(subgenres) ? subgenres : ['peak-time'],
      webAudioPreset: webAudioPreset || { type: 'kick_rumble', freq: 55, decay: 0.4 },
      likesCount: 1,
      createdAt: new Date(),
    };

    await db.insert(technoSounds).values(newSound);
    return NextResponse.json({ success: true, data: newSound });
  } catch (error: any) {
    console.error('Error creating sound:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create sound' },
      { status: 500 }
    );
  }
}
