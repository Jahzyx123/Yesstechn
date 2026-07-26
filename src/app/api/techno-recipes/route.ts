import { NextResponse } from 'next/server';
import { db } from '@/db';
import { technoRecipes } from '@/db/schema';
import { INITIAL_RECIPES } from '@/lib/seed-data';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    let recipes = await db.select().from(technoRecipes).orderBy(desc(technoRecipes.createdAt));
    if (recipes.length === 0) {
      for (const rec of INITIAL_RECIPES) {
        await db.insert(technoRecipes).values(rec).onConflictDoNothing();
      }
      recipes = await db.select().from(technoRecipes).orderBy(desc(technoRecipes.createdAt));
    }
    return NextResponse.json({ success: true, data: recipes });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ success: true, data: INITIAL_RECIPES });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      subgenreId,
      bpm,
      stylePrompt,
      lyricsArrangement,
      soundIds,
      explanation,
      author,
    } = body;

    if (!title || !subgenreId || !stylePrompt || !lyricsArrangement) {
      return NextResponse.json(
        { success: false, error: 'Missing required recipe fields' },
        { status: 400 }
      );
    }

    const id = `rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newRecipe = {
      id,
      title,
      subgenreId,
      bpm: Number(bpm) || 135,
      stylePrompt,
      lyricsArrangement,
      soundIds: Array.isArray(soundIds) ? soundIds : [],
      explanation: explanation || 'Custom Suno.AI Techno track recipe created in Vortex Techno Forge.',
      author: author || 'Community Producer',
      createdAt: new Date(),
    };

    await db.insert(technoRecipes).values(newRecipe);
    return NextResponse.json({ success: true, data: newRecipe });
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create recipe' },
      { status: 500 }
    );
  }
}
