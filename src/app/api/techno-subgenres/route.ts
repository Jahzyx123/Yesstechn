import { NextResponse } from 'next/server';
import { db } from '@/db';
import { technoSubgenres } from '@/db/schema';
import { INITIAL_SUBGENRES } from '@/lib/seed-data';

export async function GET() {
  try {
    let list = await db.select().from(technoSubgenres);
    if (list.length === 0) {
      for (const sub of INITIAL_SUBGENRES) {
        await db.insert(technoSubgenres).values(sub).onConflictDoNothing();
      }
      list = await db.select().from(technoSubgenres);
    }
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    console.error('Error fetching subgenres:', error);
    // Fallback to static in case of db transient issue
    return NextResponse.json({ success: true, data: INITIAL_SUBGENRES });
  }
}
