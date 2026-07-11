import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  if (!req.cookies.has("auth") === true) {
    const response = NextResponse.next();
    response.cookies.set("auth", "true");
    return response;
  }

  const isAuthenticated = req.cookies.get("auth")?.value === "true";

  const isAuthPage =
    
    req.nextUrl.pathname.startsWith("/signup");

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/tos", req.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/tos", "/privacy-policy"],
};
