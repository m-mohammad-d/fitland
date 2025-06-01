import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/account") || url.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("auth-token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
