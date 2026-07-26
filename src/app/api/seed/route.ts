import { NextResponse } from 'next/server';
import { db } from '@/db';
import { technoSubgenres, technoSounds, technoRecipes } from '@/db/schema';
import { INITIAL_SUBGENRES, INITIAL_SOUNDS, INITIAL_RECIPES } from '@/lib/seed-data';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Check if subgenres exist
    const existingSubgenres = await db.select().from(technoSubgenres);
    let subgenresCount = existingSubgenres.length;
    let soundsCount = 0;
    let recipesCount = 0;

    if (existingSubgenres.length === 0) {
      // Seed subgenres
      for (const sub of INITIAL_SUBGENRES) {
        await db.insert(technoSubgenres).values(sub).onConflictDoNothing();
      }
      subgenresCount = INITIAL_SUBGENRES.length;
    }

    const existingSounds = await db.select().from(technoSounds);
    if (existingSounds.length === 0) {
      for (const sound of INITIAL_SOUNDS) {
        await db.insert(technoSounds).values(sound).onConflictDoNothing();
      }
      soundsCount = INITIAL_SOUNDS.length;
    } else {
      soundsCount = existingSounds.length;
    }

    const existingRecipes = await db.select().from(technoRecipes);
    if (existingRecipes.length === 0) {
      for (const recipe of INITIAL_RECIPES) {
        await db.insert(technoRecipes).values(recipe).onConflictDoNothing();
      }
      recipesCount = INITIAL_RECIPES.length;
    } else {
      recipesCount = existingRecipes.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      stats: {
        subgenres: subgenresCount,
        sounds: soundsCount,
        recipes: recipesCount,
      },
    });
  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
