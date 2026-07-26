import { NextResponse } from 'next/server';
import { db } from '@/db';
import { userPrompts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(userPrompts).where(eq(userPrompts.id, id));
    return NextResponse.json({ success: true, message: 'Deleted prompt' });
  } catch (error: any) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete prompt' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isFavorite } = body;

    const updated = await db
      .update(userPrompts)
      .set({ isFavorite: Boolean(isFavorite) })
      .where(eq(userPrompts.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error: any) {
    console.error('Error updating prompt:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update prompt' },
      { status: 500 }
    );
  }
}
