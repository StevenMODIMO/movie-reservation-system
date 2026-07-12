import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/browse"];

const authRoutes = ["/login", "/signup", "/", "/tos", "/privacy-policy"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // User trying to access protected page without token
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged-in user trying to access guest pages
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/browse", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/browse/:path*",
    "/login",
    "/signup",
    "/tos",
    "/privacy-policy",
    "/",
  ],
};
