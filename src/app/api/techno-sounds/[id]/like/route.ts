import { NextResponse } from 'next/server';
import { db } from '@/db';
import { technoSounds } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sound = await db.select().from(technoSounds).where(eq(technoSounds.id, id));
    if (!sound || sound.length === 0) {
      return NextResponse.json({ success: false, error: 'Sound not found' }, { status: 404 });
    }

    const updated = await db
      .update(technoSounds)
      .set({
        likesCount: sql`${technoSounds.likesCount} + 1`,
      })
      .where(eq(technoSounds.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error: any) {
    console.error('Error liking sound:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to like sound' },
      { status: 500 }
    );
  }
}
