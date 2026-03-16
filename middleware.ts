import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect lesson player pages
  if (pathname.includes('/learn/')) {
    const token = req.cookies.get('lms_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
    // Token exists — let it through, the page itself will verify
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};