import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { User } from '@/types';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  const existing = findUserByEmail(email.toLowerCase());
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    enrolledCourses: [],
    completedLessons: [],
    createdAt: new Date().toISOString(),
  };

  createUser(newUser);

  const authUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    enrolledCourses: newUser.enrolledCourses,
    completedLessons: newUser.completedLessons,
  };

  const token = signToken(authUser);

  const response = NextResponse.json({ user: authUser, success: true });
  response.cookies.set('lms_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
