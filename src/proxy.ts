import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface Session {
  expiresAt: number;
}

function handleUnauthenticated(req: NextRequest) {
  // If no session and trying to access /logout, redirect to /login directly
  // (no session to terminate, avoid showing logout page with loader)
  if (req.nextUrl.pathname === '/logout') {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  if (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/') {
    const requestPage = req.nextUrl.pathname;
    const url = new URL('/login', req.nextUrl.origin);
    url.search = `p=${requestPage}`;
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export async function proxy(req: NextRequest) {
  const session = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as Session | null;

  if (req.nextUrl.pathname === '/') {
    const url = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (!session) {
    return handleUnauthenticated(req);
  }

  if (session.expiresAt && Date.now() > session.expiresAt) {
    // Session expired: clear cookie and redirect to login
    const url = new URL('/login', req.nextUrl.origin);
    if (req.nextUrl.pathname !== '/login') {
      url.search = `p=${req.nextUrl.pathname}`;
    }
    const response = NextResponse.redirect(url, 302);
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('__Secure-next-auth.session-token');
    return response;
  }

  if (req.nextUrl.pathname === '/login') {
    const url = new URL('/users', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/users/:path*', '/login', '/logout'],
};
