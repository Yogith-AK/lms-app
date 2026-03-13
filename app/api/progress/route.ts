import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { findUserById, updateUser } from '@/lib/db';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('lms_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { lessonId } = await req.json();
  if (!lessonId) return NextResponse.json({ error: 'lessonId required' }, { status: 400 });

  const user = await findUserById(decoded.id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (user.completedLessons.includes(lessonId)) {
    return NextResponse.json({ completedLessons: user.completedLessons });
  }

  const updated = await updateUser(decoded.id, {
    completedLessons: [...user.completedLessons, lessonId],
  });

  return NextResponse.json({ success: true, completedLessons: updated?.completedLessons });
}