import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { findUserById } from '@/lib/db';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('lms_token')?.value;
  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ user: null });

  const user = findUserById(decoded.id);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      enrolledCourses: user.enrolledCourses,
      completedLessons: user.completedLessons,
    }
  });
}
