import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY, TOKEN_EXPIRY_KEY } from "@/lib/utils/constants";

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

export async function proxy(request: NextRequest) {
  const isAuth = isAuthenticated(request);
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    '/dashboard',
    '/food-donors',
    '/collection-centers',
    '/waste-processors',
    '/food-waste-items'
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !isAuth) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if ((pathname.startsWith('/signin') || pathname.startsWith('/signup')) && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
   
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
