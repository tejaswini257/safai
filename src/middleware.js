// src/middleware.js
import { NextResponse } from 'next/server';

/**
 * FIX: The function must be named 'middleware' and exported.
 */
export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Simulated Auth Check (Replace with your actual token/cookie logic)
    // Check if a cookie named 'auth-token' exists
    const userToken = request.cookies.get('auth-token');

    // LOGIC 1: If trying to access dashboard WITHOUT a token, send to sign-in
    if (pathname.startsWith('/dashboard') && !userToken) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // LOGIC 2: If ALREADY logged in, don't show auth pages, send to dashboard
    if (pathname.startsWith('/auth') && userToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

/**
 * Matcher allows you to filter Middleware to run on specific paths.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};