import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we're using localStorage for tokens, we'll let the client-side handle the auth check
  // The middleware will only handle the initial redirect
  const isAuthPage = request.nextUrl.pathname === '/';
  const isDashboardPage = request.nextUrl.pathname === '/dashboard';

  // If we're on the dashboard page and there's no code parameter, let the client handle the auth check
  if (isDashboardPage && !request.nextUrl.searchParams.has('code')) {
    return NextResponse.next();
  }

  // If we're on the auth page and there's a code parameter, let the client handle the token exchange
  if (isAuthPage && request.nextUrl.searchParams.has('code')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'],
}; 