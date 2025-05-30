import { NextRequest, NextResponse } from "next/server";
import { getUserFromTokenHeader } from "./lib/Auth";
import { forbidden } from "next/navigation";
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const cookieHeader = req.headers.get("cookie");
  const user = getUserFromTokenHeader(cookieHeader);
  if (url.pathname.startsWith("/account")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (url.pathname.startsWith("/dashboard")) {
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
