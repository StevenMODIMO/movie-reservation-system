import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/browse", "/mrsai"];

const authRoutes = ["/login", "/signup", "/", "/tos", "/privacy-policy"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname === route);
  const isManageRoute = pathname.startsWith("/mrsai");
  const isBrowseRoute = pathname.startsWith("/browse");

  // User trying to access protected page without token
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged-in user trying to access guest pages
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/browse", req.url));
  }

  // Normal user trying to access admin routes
  if (isManageRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/browse", req.url));
  }

  // Admin trying to access normal-user routes
  if (isBrowseRoute && role === "admin") {
    return NextResponse.redirect(new URL("/mrsai", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mrsai/:path",
    "/browse/:path*",
    "/login",
    "/signup",
    "/tos",
    "/privacy-policy",
    "/",
  ],
};
