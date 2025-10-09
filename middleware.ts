import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/dashboard"];

  // 1️⃣ Redirect non-authenticated users trying to access protected routes
  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ Prevent logged-in users from accessing /login or /register
  if ((pathname.startsWith("/login") || pathname.startsWith("/register")) && token) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: [
    "/dashboard/:path*", // all dashboard routes
    "/login",            // login page
    "/register",         // optional register route
  ],
};
