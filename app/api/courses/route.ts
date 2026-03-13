import { NextResponse } from 'next/server';
import { courses } from '@/lib/db';

export async function GET() {
  // Return courses without full lesson details for listing
  const courseList = courses.map(({ lessons, ...rest }) => ({
    ...rest,
    lessonsCount: lessons.length,
  }));
  return NextResponse.json({ courses: courseList });
}
