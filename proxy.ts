import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/','/sign-in','/sign-up'];

const isPublicRoute = (pathname: string) =>
  publicRoutes.includes(pathname) ||
  pathname.startsWith('/sign-in/') ||
  pathname.startsWith('/sign-up/') ||
  pathname.startsWith('/pricing') ||
  pathname.startsWith('/contact');

export default clerkMiddleware(
  async (auth, request) => {
    const pathname = request.nextUrl.pathname;
    const authObject = await auth();

    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    if (authObject.isAuthenticated) {
      return NextResponse.next();
    }

    return authObject.redirectToSignIn();
  },
  {
    signInUrl: '/sign-in',
    signUpUrl: '/sign-up',
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};