// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authPaths = ["/login"];
const publicPaths: string[] = [];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (req.nextUrl.pathname.startsWith("/api")) {
    accessToken && req.headers.set("Authorization", `Bearer ${accessToken}`);
    const requestHeaders = new Headers(req.headers);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  const isAuthPage = authPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isPublicPage = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPage) {
    if (accessToken) return NextResponse.redirect(new URL("/", req.url));
  } else if (!isPublicPage && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
