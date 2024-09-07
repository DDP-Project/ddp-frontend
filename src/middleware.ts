// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (isLoginPage && accessToken)
    return NextResponse.redirect(new URL("/", req.url));

  if (!isLoginPage && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
