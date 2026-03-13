import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { findUserById, findCourseById, updateUser } from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('lms_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const course = findCourseById(params.id);
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const user = findUserById(decoded.id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (user.enrolledCourses.includes(params.id)) {
    return NextResponse.json({ message: 'Already enrolled', enrolled: true });
  }

  const updated = updateUser(decoded.id, {
    enrolledCourses: [...user.enrolledCourses, params.id],
  });

  return NextResponse.json({ success: true, enrolledCourses: updated?.enrolledCourses });
}
