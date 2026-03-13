import { NextRequest, NextResponse } from 'next/server';
import { findCourseById } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const course = findCourseById(params.id);
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  return NextResponse.json({ course });
}
