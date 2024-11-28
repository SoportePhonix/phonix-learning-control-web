import { DateTime } from 'luxon';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface Session {
  token_expires: string;
}

function handleUnauthenticated(req: NextRequest) {
  if (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/') {
    const requestPage = req.nextUrl.pathname;
    const url = new URL('/login', req.nextUrl.origin);
    url.search = `p=${requestPage}`;
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

function isSessionExpired(tokenExpires: string) {
  const currentTime = DateTime.now().setZone('America/Bogota').toFormat('yyyy-MM-dd HH:mm:ss');
  return currentTime > tokenExpires;
}

export async function middleware(req: NextRequest) {
  const session = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as Session | null;

  if (req.nextUrl.pathname === '/') {
    const url = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (!session) {
    return handleUnauthenticated(req);
  }

  if (typeof session.token_expires === 'string' && isSessionExpired(session.token_expires)) {
    return NextResponse.redirect(new URL('/logout', req.nextUrl));
  }

  if (req.nextUrl.pathname === '/login') {
    const url = new URL('/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login'],
};
