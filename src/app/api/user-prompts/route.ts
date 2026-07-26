import { NextResponse } from 'next/server';
import { db } from '@/db';
import { userPrompts } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const list = await db.select().from(userPrompts).orderBy(desc(userPrompts.createdAt));
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    console.error('Error fetching user prompts:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      subgenreId,
      stylePrompt,
      lyricsArrangement,
      bpm,
      selectedSoundIds,
      notes,
      isFavorite,
    } = body;

    if (!title || !stylePrompt) {
      return NextResponse.json(
        { success: false, error: 'Title and stylePrompt are required' },
        { status: 400 }
      );
    }

    const id = `prm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newPrompt = {
      id,
      title,
      subgenreId: subgenreId || 'sub-peaktime',
      stylePrompt,
      lyricsArrangement: lyricsArrangement || '',
      bpm: Number(bpm) || 135,
      selectedSoundIds: Array.isArray(selectedSoundIds) ? selectedSoundIds : [],
      notes: notes || '',
      isFavorite: Boolean(isFavorite),
      createdAt: new Date(),
    };

    await db.insert(userPrompts).values(newPrompt);
    return NextResponse.json({ success: true, data: newPrompt });
  } catch (error: any) {
    console.error('Error saving prompt:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save prompt' },
      { status: 500 }
    );
  }
}
