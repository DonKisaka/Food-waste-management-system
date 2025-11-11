import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY, TOKEN_EXPIRY_KEY } from "@/lib/utils/constants";

// Helper function to check authentication in middleware
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const expiry = request.cookies.get(TOKEN_EXPIRY_KEY)?.value;

  if (!token || !expiry) {
    return false;
  }

  const expiryTime = parseInt(expiry, 10);
  if (Date.now() >= expiryTime) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const isAuth = isAuthenticated(request);
  const { pathname } = request.nextUrl;

  // Protected routes (dashboard and all entity pages)
  const protectedRoutes = [
    '/dashboard',
    '/food-donors',
    '/collection-centers',
    '/waste-processors',
    '/food-waste-items'
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuth) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if ((pathname.startsWith('/signin') || pathname.startsWith('/signup')) && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
