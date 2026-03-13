import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const PUBLIC_PATHS = ['/', '/auth', '/api/auth/signin', '/api/auth/signup'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith('/api/auth'))) {
    return NextResponse.next();
  }

  // Protect dashboard, courses (learn view)
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.match(/\/courses\/[^/]+\/learn/);

  if (isProtected) {
    const token = req.cookies.get('lms_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
